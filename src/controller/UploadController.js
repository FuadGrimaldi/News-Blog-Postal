const multer = require("multer");

// storege image
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/profile");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "public/images/profile/jpg" ||
    file.mimetype === "public/images/profile/jpeg" ||
    file.mimetype === "public/images/profile/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = { fileFilter, profileStorage };
