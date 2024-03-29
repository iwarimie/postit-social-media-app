const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");


// const bcrypt = require("bcrypt");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');



dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to MongoDB")
});

//middlewares
app.use(express.json());
app.use(helmet());  
app.use(morgan("common"));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);








const port = process.env.PORT || 2929;
app.listen(2929, () => {
    console.log(`Postit server is running on http://localhost:${port}`);
});