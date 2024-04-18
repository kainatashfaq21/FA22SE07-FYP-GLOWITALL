const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const eyesSkincareProductRouter = require("./routes/eyesSkincareRoutes");
const lipsSkincareProductRouter = require("./routes/lipsSkincareRoutes");
const blogRouter = require("./routes/blogRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const blogcategoryRouter = require("./routes/blogCatRoutes");
const brandRouter = require("./routes/brandRoutes");
const uploadRouter = require("./routes/uploadRoute");
const colorRouter = require("./routes/colorRoutes");
const recommendationRoutes = require('./routes/SkinRecommendationRoutes');
const foundationrecommendationRoutes = require('./routes/FoundationRecommendationRoutes');
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require('cors');

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/user",authRouter);
app.use("/api/product",productRouter);
app.use("/api/eyes-skincare-product",eyesSkincareProductRouter);
app.use("/api/lips-skincare-product",lipsSkincareProductRouter);
app.use('/api/foundation/recommendation',foundationrecommendationRoutes);
app.use('/api/recommendation', recommendationRoutes);

app.use("/api/blog",blogRouter);
app.use("/api/category",categoryRouter);
app.use("/api/blogcategory",blogcategoryRouter);
app.use("/api/brand",brandRouter);
app.use("/api/upload",uploadRouter);
app.use("/api/color",colorRouter);





app.use (notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});