const EyesSkincareProduct = require("../models/eyesSkincareModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require('fs');
const validateMongoDbId = require("../utils/validateMongodbId");

//create products
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await EyesSkincareProduct.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//get a single product
const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await EyesSkincareProduct.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//get all products
const getallProduct = asyncHandler(async (req, res) => {
  //Filtering
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = EyesSkincareProduct.find(JSON.parse(queryStr));

    //Sorting

    if (req.query.sort) {
      const SortBy = req.query.sort.split(",").join(" ");
      query = query.sort(SortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //Limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //Pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await EyesSkincareProduct.countDocuments();
      if (skip >= productCount) throw new Error("This page does not exists");
    }
    console.log(page, limit, skip);

    const product = await query;
    res.json(product);
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
    const updateaProduct = await EyesSkincareProduct.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    res.json(updateaProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//delete products
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const deleteProduct = await EyesSkincareProduct.findOneAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
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
            wishlist: prodId
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
            wishlist: prodId
          },
        },
        {
          new: true,
        }
      );
      res.json(user);
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
    const product = await EyesSkincareProduct.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await EyesSkincareProduct.updateOne(
        {
          ratings: {
            $elemMatch: alreadyRated
          },
        },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.comment": comment
          },
        },
        {
          new: true,
        }
      );
          
    } else {
      const rateProduct = await EyesSkincareProduct.findByIdAndUpdate(
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

    const getallratings = await EyesSkincareProduct.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalProduct = await EyesSkincareProduct.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      {
        new: true,
      },
    );
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadImages = asyncHandler(async(req,res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    console.log(req.files);
    try{
        const uploader = (path) => cloudinaryUploadImg(path,"images");
        const urls = [];
        const files = req.files;
        for(const file of files){
            const {path} = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        }
        const findProduct = await EyesSkincareProduct.findByIdAndUpdate(id,{
            images: urls.map((file) =>{
                return file;
            }),
        },
        {
            new:true
        }
        );
        res.json(findProduct);
    }
    catch(error){
        throw new Error (error);
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
};
