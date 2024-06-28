const multer = require("multer");

const storage = multer.diskStorage({
    filename: function(req,file,cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: storage});
// const upload = multer({
//     storage: multerStorage,
//   limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
//   fileFilter: ImageFilter,
// });
module.exports = upload;