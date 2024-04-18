const Category = require("../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newcategory = await Category.create(req.body);
    res.json(newcategory);
  } catch (error) {
    throw new Error(error);
  }
});

//Update a category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCategory = await Category.findOneAndUpdate(
      { _id: id },
      req.body
    );
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCategory = await Category.findOneAndDelete({ _id: id });
    res.json(deleteCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//Get a category

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCategory = await Category.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//Get all category
const getallCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await Category.find();
    res.json(getallCategory);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
};
