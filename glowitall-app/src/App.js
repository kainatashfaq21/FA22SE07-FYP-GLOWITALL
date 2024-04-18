import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Blog from "./pages/Blog.js";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Signup from "./pages/Signup";
import Resetpassword from "./pages/Resetpassword";
import SingleBlog from "./pages/SingleBlog";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import FaceMakeup from "./pages/FaceMakeup";
import FaceSkincare from "./pages/FaceSkincare";
import EyesMakeup from "./pages/EyesMakeup";
import EyesSkincare from "./pages/EyesSkincare";
import LipsMakeup from "./pages/LipsMakeup";
import LipsSkincare from "./pages/LipsSkincare";
import Body from "./pages/Body";
import StarterPageSkincare from "./pages/StarterPageSkincare";
import FoundationFinder from "./pages/FoundationFinder";
import MascaraFinder from "./pages/MascaraFinder";
import BlushFinder from "./pages/BlushFinder";
import LipstickFinder from "./pages/LipstickFinder";
import LashFinder from "./pages/LashFinder";
import SkinCareQuiz from "./pages/SkincareQuiz";
import StarterPageMakeup from "./pages/StarterPageMakeup";
import FoundationQuiz from "./pages/FoundationQuiz";
import MascaraQuiz from "./pages/MascaraQuiz";
import LashQuiz from "./pages/LashQuiz";
import LipstickQuiz from "./pages/LipstickQuiz";
import BlushQuiz from "./pages/BlushQuiz";
import ShopAll from "./pages/ShopAll";
import Bundles from "./pages/Bundles";
import FoundationResult from "./pages/FoundationResult";
import LashResult from "./pages/LashResult";
import BlushResult from "./pages/BlushResult";
import MascaraResult from "./pages/MascaraResult";
import LipResult from "./pages/LipsResult";
import SkincareResult from "./pages/SkinResult";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import AboutUs from "./pages/AboutUs";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import { PrivateRoutes } from "./routes/privateRoutes";
import { OpenRoutes } from "./routes/openRoutes";
import SkincareRecommendation from "./pages/SkinResult";
import SendVerification from "./pages/SendVerification";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentReject from "./pages/PaymentReject ";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="face-makeup" element={<FaceMakeup />} />
            <Route path="face-skincare" element={<FaceSkincare />} />
            <Route path="eyes-makeup" element={<EyesMakeup />} />
            <Route path="eyes-skincare" element={<EyesSkincare />} />
            <Route path="lips-makeup" element={<LipsMakeup />} />
            <Route path="lips-skincare" element={<LipsSkincare />} />
            <Route path="body" element={<Body />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route
              path="cart"
              element={
                <OpenRoutes>
                  <Cart />
                </OpenRoutes>
              }
            />
            <Route path="my-orders" element={<Orders />} />
            <Route path="my-profile" element={<Profile />} />
            <Route path="check-out" element={<Checkout />} />
            <Route path="Payment" element={<Payment />} />
            <Route path="wishlist" element={<Wishlist />} />
           
            <Route path="forgot-password" element={<Forgotpassword />} />
            <Route path="sendotp" element={<SendVerification />} />
            
            <Route path="payment-reject" element={<PaymentReject />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="reset-password/:token" element={<Resetpassword />} />
            <Route path="Start-skincare" element={<StarterPageSkincare />} />
            <Route path="Start-makeup" element={<StarterPageMakeup />} />
            <Route path="Start-foundation" element={<FoundationFinder />} />
            <Route path="Start-mascara" element={<MascaraFinder />} />
            <Route path="Start-blush" element={<BlushFinder />} />
            <Route path="Start-lipstick" element={<LipstickFinder />} />
            <Route path="Start-lash" element={<LashFinder />} />
            <Route path="skincarequiz" element={<SkinCareQuiz />} />
            <Route path="foundationquiz" element={<FoundationQuiz />} />
            <Route path="mascaraquiz" element={<MascaraQuiz />} />
            <Route path="lashquiz" element={<LashQuiz />} />
            <Route path="lipquiz" element={<LipstickQuiz />} />
            <Route path="blushquiz" element={<BlushQuiz />} />
            <Route path="Shop-All" element={<ShopAll />} />
            <Route path="Bundles" element={<Bundles />} />
            <Route path="About-Us" element={<AboutUs />} />
            <Route path="F-Result" element={<FoundationResult />} />
            <Route path="L-Result" element={<LashResult />} />
            <Route path="M-Result" element={<MascaraResult />} />
            <Route path="Lips-Result" element={<LipResult />} />
            <Route path="B-Result" element={<BlushResult />} />
            <Route path="SC-Result" element={<SkincareResult />} />
            <Route path="SC-QUIZ" element={<SkincareRecommendation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
