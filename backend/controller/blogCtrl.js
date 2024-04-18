const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");

//Create a blog
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//Update a blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const { blogData } = req.body;
  validateMongoDbId(id);

  try {
    const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, blogData, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//Get a blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    const updateViews = await Blog.findOneAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      {
        new: true,
      }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//Get all blog
const getallBlog = asyncHandler(async (req, res) => {
  try {
    const getallBlog = await Blog.find();
    res.json(getallBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteBlog = await Blog.findOneAndDelete({ _id: id });
    res.json(deleteBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//Like a blog
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  //Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  //find the login user
  const loginUserId = req?.user?._id;
  //Find if the user has liked the blog
  const isLiked = blog?.isLiked;
  //Find if the user has disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId.toString()
  );
  if (alreadyDisliked) {
    const Blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: {
          dislikes: loginUserId,
        },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  }

  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: {
          likes: loginUserId,
        },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: {
          likes: loginUserId,
        },
        isLiked: true,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  }
});

//Dislike a blog
const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  //Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  //find the login user
  const loginUserId = req?.user?._id;
  //Find if the user has liked the blog
  const isDisLiked = blog?.isDisliked;
  //Find if the user has disliked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId.toString()
  );
  if (alreadyLiked) {
    const Blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: {
          likes: loginUserId,
        },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  }

  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: {
          dislikes: loginUserId,
        },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: {
          dislikes: loginUserId,
        },
        isDisliked: true,
      },
      {
        new: true,
      }
    );
    res.json(blog);
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
    const findBlog = await Blog.findByIdAndUpdate(
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
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getallBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
};
