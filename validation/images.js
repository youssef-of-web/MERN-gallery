const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidateImage(req) {
  let errors = {};
  req.body.title = !isEmpty(req.body.title) ? req.body.title : "";
  req.file = !isEmpty(req.file) ? req.file : "";

  if (validator.isEmpty(req.body.title)) {
    errors.title = "Required title";
  }
  if (!req.file.filename) {
    errors.image = "Required image";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
