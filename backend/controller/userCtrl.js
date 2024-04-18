const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generaterefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const SendEmailVerificationOTP = require("../utils/SendEmailVerificationOTP");
//Create a user

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const createUser = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email;
    let user = await User.findOne({ email: email });

    const generateRandomNumber = () => {
      const min = 100000;
      const max = 999999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    if (user) {
      if (user.verified) {
        throw new Error("User already exists");
      } else {
        const otp = generateRandomNumber();
        user.otp = otp;
        await user.save();
      }
    } else {
      const otp = generateRandomNumber();
      user = await User.create({ ...req.body, otp });
    }

    const data = {
      to: email,
      otp: user.otp,
    };

    SendEmailVerificationOTP(data);

    const sendData = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    };

    res.status(200).json({
      status: 200,
      message: "OTP has been sent to your email",
      data: sendData,
    });
  } catch (error) {
    if (error.message === "User already exists") {
      res.status(401).json({ status: 401, message: "User already exists" });
    } else {
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  }
});

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email: email, otp: otp });
    if (user) {
      user.otp = null;
      user.verified = true;
      await user.save();
      console.log("OTP verified");
      res.json({ status: 200, message: "OTP has been verified successfully." });
    } else {
      res.json({ status: 404, message: "User not found or OTP is incorrect." });
    }
  } catch (error) {
    res.json({ status: 500, message: "Internal server error." });
  }
};

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const verified = true;
  //check if user exists or not
  const findUser = await User.findOne({ email, verified });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = generaterefreshToken(findUser?._id);
    // const updateuser = await User.findByIdAndUpdate(
    //   findUser.id,
    //   {
    //     refreshToken: refreshToken,
    //   },
    //   { new: true }
    // );
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 72 * 60 * 60 * 1000,
    // });
    const userToken = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res
      .status(200)
      .json({ status: 200, message: "succesfully login", findUser, userToken });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh Token in cookies");
  const refreshToken = cookie.refreshToken;
  console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh Token present in DB or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id != decoded.id) {
      throw new Error("There is something wrong with Refresh Token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

//Logout a user
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh Token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); //forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); //forbidden
});

//Save User Address
const saveAddress = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    const updateaUser = await User.findByIdAndUpdate(
      id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updateaUser);
  } catch (error) {
    throw new Error(error);
  }
});

//get all users
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find({ verified: true, role: "user" });
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//get a single user
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);
    res.json({ getaUser });
  } catch (error) {
    throw new Error(error);
  }
});

//delete a single user
const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//update a user
const updatedUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);
  
  try {
    const updateFields = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      address: req.body.address,
      profile: req.body.profile,
    };

    // Remove undefined fields
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true,
      }
    );

    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});


const updatePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;
  validateMongoDbId(id);
  const user = await User.findById(id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with Email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `<a href='http://localhost:3000/reset-password/${token}'> Click Here </>`;
    const data = {
      to: email,
      subject: "Forgot Passsword Link",
      html: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  console.log(req.params, req.body);

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log(hashedToken);
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  console.log(user);
  if (!user) throw new Error("Token expires please try again later.");
  user.password = password;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();
  res.json(user);
});

//admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await User.findOne({ email });
  console.log(findAdmin);
  // if (!findAdmin) {
  //   throw new Error("Admin not found");
  // }
  // if (findAdmin.role !== "admin") {
  //   throw new Error("Not Authorized");
  // }
  //check if user exists or not

  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshtoken = await generaterefreshToken(findAdmin?._id);
    /*const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshtoken: refreshtoken,
      },
      { new: true }
    );
    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });*/

    const userToken = jwt.sign({ id: findAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({ status: 200, findAdmin, userToken });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//get wishlist
const getwishlist = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);

  try {
    const findUser = await User.findById(id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { productId, color, quantity, price } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    if (quantity <= 0) {
      return res.status(400).json({
        message: "please select product quantity 1 or more",
      });
    }

    if (quantity > product.quantity) {
      return res.status(400).json({
        message: "Not enough products available",
      });
    }

    let cartItem = await Cart.findOne({ userId: _id, productId, color });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = await new Cart({
        userId: _id,
        productId,
        color,
        price,
        quantity,
      }).save();
    }

    res.json({ message: "prodcut added to cart successfuly", cartItem });
  } catch (error) {
    throw new Error(error);
  }
});

const getuserCart = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);

  try {
    const cart = await Cart.find({ userId: id })
      .populate("productId")
      .populate("color");
    res.json(cart);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  validateMongoDbId(_id);

  try {
    const deleteProductFromCart = await Cart.deleteOne({
      userId: _id,
      _id: cartItemId,
    });
    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQuantity } = req.params;
  validateMongoDbId(_id);

  try {
    const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    const product = await Product.findById(cartItem.productId);
    if (!product) {
      return res.status(400).json({
        message: "Product not available",
      });
    }

    if (newQuantity > product.quantity) {
      return res.status(400).json({
        message: "Quantity exceeds the available quantity of the product",
      });
    }

    cartItem.quantity = newQuantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paymentInfo,
    paymentStatus,
  } = req.body;
  console.log(req.body);
  const { id } = req.user;
  validateMongoDbId(id);

  // try {
  for (const orderItem of orderItems) {
    const product = await Product.findById(orderItem.productId);
    if (product) {
      if (orderItem.quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: `please select products  1 or more ${product.brand}`,
        });
      }
      if (orderItem.quantity > product.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient quantity available for product  ${product.brand}`,
        });
      }

      if (product.category.includes("skincare")) {
        orderItem.color = null;
      }
    } else {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${orderItem.productId} not found`,
      });
    }
  }
  const order = await Order.create({
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paymentInfo,
    paymentStatus,
    user: id,
  });

  if (order) {
    for (const orderItem of orderItems) {
      const product = await Product.findById(orderItem.productId);
      if (product) {
        if (product.quantity < 0) {
          product.quantity = 0;
        } else {
          product.quantity -= orderItem.quantity;
        }
        await product.save();
      }
    }
    await Cart.deleteMany({ userId: id });
  }

  console.log(order);
  res.status(200).json({
    order,
    success: true,
  });
  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     error: "internal server error",
  //   });
  // }
});

const updateOrder = asyncHandler(async (req, res) => {
  const { session_id } = req.params;
  const { paymentStatus } = req.body;
  const Status = paymentStatus;
  const { id } = req.user;
  validateMongoDbId(id);

  try {
    const order = await Order.findOne({ paymentInfo: session_id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = Status;
    await order.save();

    res.json({ message: "Order succesfully recieved", order: order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order payment status" });
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await Order.find({
      user: id,
      paymentStatus: { $in: ["paid", "cash on delivery"] },
    })
      .populate("user")
      .populate("orderItems.productId")
      .populate("orderItems.color");
    res.json({
      orders,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({
      paymentStatus: { $in: ["paid", "cash on delivery"] },
    })
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("orderItems.productId")
      .populate("orderItems.color");
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

/*const emptyCart = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);

  try {
    const user = await User.findOne({ id });
    const cart = await Cart.findOneAndRemove({ orderby: user.id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});*/

/*const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  const user = await User.findOne({ _id });
  let { proucts, cartTotal } = await Cart.findOne({
    orderby: user?._id,
  }).populate("products.product");

  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    {
      orderby: user?._id,
    },
    {
      totalAfterDiscount,
    },
    {
      new: true,
    }
  );
  res.json(totalAfterDiscount);
});

  const createOrder = asyncHandler(async (req, res) => {
  const { COD } = req.body;
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    if (!COD) throw new Error("Create cash card failed");
    const user = await User.findOne({ id });
    let userCart = await Cart.findOne({
      orderby: user.id,
    });
    if (!userCart) {
      throw new Error("User cart not found");
    }
    let finalAmount = userCart.cartTotal;
    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user.id,
      orderStatus: "Cash on Delivery",
    }).save();
    console.log(newOrder);

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { id: item.product.id },
          update: {
            $inc: {
              quantity: -item.count,
              sold: +item.count,
            },
          },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
    console.log(updated);
  } catch (error) {
    throw new Error(error);
  }
});
*/

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;
  const { order_id } = req.params;
  const { id } = req.user;
  validateMongoDbId(id);

  try {
    const order = await Order.findOne({ _id: order_id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.orderStatus = orderStatus;
    await order.save();
    res.json({ message: "Order Status Updated", order: order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status" });
  }
});

const uploadProfilePic = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    // console.log(result);
    const uri = result.secure_url;
    if (result) {
      res.json({ status: 200, message: "Profile Updated", data: uri });
    } else {
      res.json({ status: 200, message: "Failed to upload", data: null });
    }
  } catch (error) {
    res.json({ status: 200, message: "internal server error", data: null });
  }
});

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

module.exports = {
  createUser,
  verifyOTP,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getwishlist,
  saveAddress,
  userCart,
  getuserCart,
  removeProductFromCart,
  updateProductQuantityFromCart,
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrder,
  updateOrderStatus,
  uploadProfilePic,
};
//getallorders
//getorderbyuserid
