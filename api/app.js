import express from "express"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv';
import cors from "cors"
import multer from "multer";
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
import testRoute from "./routes/test.route.js"
import userRoute from "./routes/user.route.js"
import chatRoute from "./routes/chat.route.js"
import messageRoute from "./routes/message.route.js"
import adminRoute from "./routes/admin.route.js"


const app = express()

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
          cb(null, "./public/avatar"); // Folder where files will be stores
          },

  filename: (req, file, cb) => {
            const name = Date.now() + "-" + file.originalname;
            cb(null, name);
          }
      });






const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
                cb(null, "./public/post"); // Folder where files will be stores
                },
      
    filename: (req, file, cb) => {
                  const name = Date.now() + "-" + file.originalname;
                  cb(null, name);
                }
            });



const uploadAvatar = multer({
    storage: avatarStorage,      // How and where to store uploaded files
    });


  const uploadPost = multer({
      storage: postStorage,      // How and where to store uploaded files
      });





app.use('/api/avatar', express.static('./public/avatar'));
app.use('/api/postImage', express.static('./public/post'));

  app.use(cors({
    origin: [
      "http://localhost:5173", //use your actual frontend origin
      "http://localhost:3000"
    ],
    credentials: true //allow cookies/headers/auth
  }));
app.use(express.json())
app.use(cookieParser())

dotenv.config();





app.post("/api/uploads/avatar", uploadAvatar.single("avatar"), (req, res) => {
    const avatarUrl = req.file ? `http://localhost:5000/api/avatar/${req.file.filename}` : null

    res.status(200).json(avatarUrl)
})

app.post("/api/uploads/post", uploadPost.array("postImage"), (req, res) => {
  const files = req.files
  const postImagesUrl = files.map((file) => `http://localhost:5000/api/postImage/${file.filename}`)
  console.log(postImagesUrl)
  res.status(200).json(postImagesUrl)
})

app.use("/api/posts", postRoute)
app.use("/api/auth", authRoute)
app.use("/api/test", testRoute)
app.use("/api/users", userRoute)
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute)
app.use("/api/admin", adminRoute)


app.listen(5000, () => {
    console.log(`App has started on port ${5000}`)
})