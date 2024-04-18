const express = require("express");
const { createBlog, updateBlog, getBlog, getallBlog, deleteBlog, likeBlog, dislikeBlog, uploadImages } = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
//router.post("/", authMiddleware, createBlog);
router.put("/likes", authMiddleware, likeBlog);
router.put("/upload/:id",authMiddleware,isAdmin,uploadPhoto.array('images',10),blogImgResize,uploadImages);
//router.put("/upload/:id", authMiddleware, uploadPhoto.array("images",2), blogImgResize, uploadImages);
router.put("/dislikes", authMiddleware, dislikeBlog);
//router.put("/dislikes", authMiddleware, dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
//router.put("/:id", authMiddleware, updateBlog);
router.get("/:id", getBlog);
router.get("/", getallBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);
//router.delete("/:id", authMiddleware, deleteBlog);


module.exports = router;

