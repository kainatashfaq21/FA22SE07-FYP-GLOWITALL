const express = require("express");
const { createProduct, getaProduct, getallProduct, updateaProduct, deleteProduct, addToWishlist, rating, uploadImages} = require("../controller/lipsSkincareCtrl");
const { authMiddleware ,isAdmin} = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.get("/", getallProduct);
router.put("/:id", authMiddleware, isAdmin, updateaProduct);
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array('images',10), productImgResize, uploadImages);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
