import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./route/user.route.js";
import bookRoute from "./route/book.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static("public/files"));

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log("Error:", error));

app.use("/book", bookRoute);

app.use("/user", userRoute); 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
