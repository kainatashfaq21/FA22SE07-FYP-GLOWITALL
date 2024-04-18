const express = require("express");
const { createCategory, updateCategory, deleteCategory, getCategory, getallCategory } = require("../controller/blogCatCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

//router.post("/", authMiddleware, createCategory);
router.post("/",authMiddleware,isAdmin,createCategory);
//router.put("/:id", authMiddleware, updateCategory);
router.put("/:id",authMiddleware,isAdmin,updateCategory);
//router.delete("/:id", authMiddleware, deleteCategory);
router.delete("/:id",authMiddleware,isAdmin,deleteCategory);
router.get("/:id",getCategory);
router.get("/",getallCategory);




module.exports = router;