// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   cloud_name: "name",
//   api_key: "key",
//   api_secret: "key",
// });

// const ensureUploadsDirectory = () => {
//   const uploadDir = path.join(__dirname, "uploads/");
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
//   }
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     ensureUploadsDirectory();
//     cb(null, "C:/Users/Moosa/Desktop/Ecommerce/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//     //console.log(file.originalname);
//   },
// });

// const saveimage = multer({ storage: storage });

// const uploadToCloudinary = (file, cb) => {
//   cloudinary.uploader.upload(
//     file.path,
//     { folder: "uploads" },
//     function (error, result) {
//       if (error) {
//         console.log(error);
//         return cb(error);
//       }
//       cb(null, result.secure_url);
//     }
//   );
// };

// module.exports = { saveimage, uploadToCloudinary };
