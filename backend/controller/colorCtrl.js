const Color = require("../models/colorModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    throw new Error(error);
  }
});

//Update a Color
const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateColor = await Color.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.json(updateColor);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a Color
const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteColor = await Color.findOneAndDelete({ _id: id });
    res.json(deleteColor);
  } catch (error) {
    throw new Error(error);
  }
});
//Get a Color

const getColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getColor = await Color.findById(id);
    res.json(getColor);
  } catch (error) {
    throw new Error(error);
  }
});

//Get all Color
const getallColor = asyncHandler(async (req, res) => {
  try {
    const getallColor = await Color.find();
    res.json(getallColor);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getallColor,
};
