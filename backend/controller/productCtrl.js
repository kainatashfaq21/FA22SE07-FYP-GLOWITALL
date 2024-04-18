const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");
const validateMongoDbId = require("../utils/validateMongodbId");
const sendNotificationToUser = require("../utils/SendNotificationToUser");
const getRecommendedProducts = asyncHandler(async (req, res) => {
  console.log("req.body:", req.body);
  try {
    const { selected, category, productType } = req.body;
    console.log(req.body.data);
    // console.log(type);
    const categoryRegex = new RegExp(category, "i");
    const products = await Product.find({
      recommendations: { $all: selected },
      category: { $regex: categoryRegex },
      // productType: productType,
    });
    console.log("products:", products);
    res.json({
      status: 200,
      message: "Your recommended Products",
      data: products,
    });
  } catch {
    res.json({
      status: 400,
      message: "Internal Server Error",
      data: null,
    });
  }
});

//create products
const createProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    // Extract ObjectId values from the color field
    const colorIds = req.body.color.map((color) => color.value);

    // Replace the color field with the ObjectId values
    req.body.color = colorIds;

    const newProduct = await Product.create(req.body);
    res.json({ newProduct, message: "create product" });
  } catch (error) {
    throw new Error(error);
  }
});

//get a single product
const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id).populate("color");
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//get all products
const getallProduct = asyncHandler(async (req, res) => {
  try {
    let query = Product.find();

    // Filtering based on category
    if (req.query.category) {
      query = query.where("category").equals(req.query.category);
    }

    // Filtering based on tag
    if (req.query.tags) {
      query = query.where("tags").equals(req.query.tags);
    }

    // Filtering based on brand
    if (req.query.brand) {
      query = query.where("brand").equals(req.query.brand);
    }

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Populating the color information
    query = query.populate("color");

    // Pagination
    const page = req.query._page ? parseInt(req.query._page) : 1;
    const limit = req.query._limit ? parseInt(req.query._limit) : 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // Execute the query
    const products = await query;
    const productCount = await Product.countDocuments(query.getFilter());

    res.json({ products, totalProducts: productCount });
  } catch (error) {
    throw new Error(error);
  }
});

//update products
const updateaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const colorIds = req.body.color.map((color) => color.value);

    // Replace the color field with the ObjectId values
    req.body.color = colorIds;
    const product = await Product.findById({ _id: id });
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    console.log(req.body);
    console.log(product);
    if (req.body.quantity != product.quantity) {
      const usersWithWishlist = await User.find({
        wishlist: { $in: [updatedProduct._id.toString()] },
      });

      console.log(usersWithWishlist);
      usersWithWishlist.forEach((user) => {
        const data = {
          user,
          updatedProduct,
        };
        sendNotificationToUser(data);
      });
    }
    res.json({
      status: 200,
      message: "product updated sucessfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product." });
  }
});

//delete products
const deleteProduct = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { productId } = req.params;

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const deleteProduct = await Product.findOneAndDelete({ _id: productId });
    if (deleteProduct) {
      res.json({
        status: 200,
        message: "product deleted successfully",
        data: deleteProduct,
      });
    } else {
      res.json({
        status: 400,
        message: "Failed to delete",
        data: null,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const featureProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: { tags: "featured" } },
      { $sample: { size: 10 } },
    ]);

    console.log(products);

    res.json({
      status: 200,
      message: "Featured products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Add to wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((_id) => _id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: {
            wishlist: prodId,
          },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: {
            wishlist: prodId,
          },
        },
        {
          new: true,
        }
      );
      res.json({
        status: 200,
        message: "Product successfully added to wishlist ",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

//Ratings
const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, prodId } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: {
            $elemMatch: alreadyRated,
          },
        },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.comment": comment,
          },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }

    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      {
        new: true,
      }
    );
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  console.log(req.files);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getallProduct,
  updateaProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
  getRecommendedProducts,
  featureProducts,
};
