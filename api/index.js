const express = require("express");
const app = express();
const cors = require("cors");
const corsGate = require('cors-gate');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    },
});


const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File Succesfully Uploaded.");
});



app.use(corsGate.originFallbackToReferrer());

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

app.use(express.json());

app.use(corsGate({
    strict: true,
    allowSafe: true,
    origin: 'http://localhost:5000'
}));



app.use("/images/", express.static(path.join(__dirname, "/images/")));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(5000, () => {
    console.log("Server is currently connected on port 5000");
});