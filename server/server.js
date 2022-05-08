const express = require("express");
const app = express();
const cors = require("cors");
const studentRoute = require("./routes/student");
const videosRoute = require("./routes/videos");
const playlistRoute = require("./routes/playlists");
const blogsRoute = require("./routes/blogs");
const commentsRoute = require("./routes/comments");
const instituteRoute = require("./routes/institute");
const testimonialsRoute = require("./routes/testimonials");
const faqsRoute = require("./routes/faq");
const adminRoute = require("./routes/admin");
const mentorsRoute = require("./routes/mentors");
const squadRoute = require("./routes/squad");
const cookieParser = require("cookie-parser");
const RefreshToken = require("./Controller/RefreshToken");
require("dotenv").config();

const port = process.env.PORT || 5000;


app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/student", studentRoute);
app.use("/videos", videosRoute);
app.use("/playlists", playlistRoute);
app.use("/blogs", blogsRoute);
app.use("/comments", commentsRoute);
app.use("/institute", instituteRoute);
app.use("/testimonials", testimonialsRoute);
app.use("/faqs", faqsRoute);
app.use("/token", RefreshToken);
app.use("/admin", adminRoute);
app.use("/mentors", mentorsRoute);
app.use("/squad", squadRoute);
app.use('/api/payment', require('./routes/paytm_pay'));
app.use('/api', require('./routes/different_routes'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});