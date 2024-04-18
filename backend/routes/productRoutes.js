const express = require("express");
const {
  createProduct,
  getaProduct,
  getallProduct,
  updateaProduct,
  deleteProduct,
  addToWishlist,
  rating,
  featureProducts,
  uploadImages,
  getRecommendedProducts,
} = require("../controller/productCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", createProduct);

router.post("/recommendations", getRecommendedProducts);
router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.delete("/delete/:productId" ,authMiddleware,isAdmin, deleteProduct )
// router.get("/random-products",getRandomProducts);
router.get("/get/featured", featureProducts);
router.get("/", getallProduct);
router.put("/:id", authMiddleware, isAdmin, updateaProduct);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
