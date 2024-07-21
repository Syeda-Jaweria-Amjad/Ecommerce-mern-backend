const multer = require("multer");

// Configuring storage options for multer
const imgConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }    
});

const isImage = (req, file, callback) => {        
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new Error("Only image files are allowed"));
    }
};

const upload = multer({
    storage: imgConfig,
    fileFilter: isImage,
    limits: { fileSize: 1 * 1024 * 1024 } // 1MB limit
});

module.exports = upload;
