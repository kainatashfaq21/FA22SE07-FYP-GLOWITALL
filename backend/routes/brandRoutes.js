const express = require("express");
const { createBrand, updateBrand, deleteBrand, getBrand, getallBrand } = require("../controller/brandCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createBrand);
//router.post("/",authMiddleware,isAdmin,createBrand);
router.put("/:id", authMiddleware, updateBrand);
//router.put("/:id",authMiddleware,isAdmin,updateBrand);
router.delete("/:id", authMiddleware, deleteBrand);
//router.delete("/:id",authMiddleware,isAdmin,deleteBrand);
router.get("/:id",getBrand);
router.get("/",getallBrand);




module.exports = router;