var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};

var uploadFolder = './upload/';

createFolder(uploadFolder);

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './upload/');
  },
  filename: function (req, file, callback) {
    var fileFormat = (file.originalname).split(".");
    var filetype = fileFormat[fileFormat.length - 1]
    /*
    if (filetype !== 'zip') {
      if (filetype !== 'rar') {
        return false;
      }
    }
    */
    var fileExportName = fileFormat[fileFormat.length - 2] + '.' + Date.now() + '.' + fileFormat[fileFormat.length - 1]
    callback(null, fileExportName);
  }
});

var upload = multer({
  storage: storage
}).single('userFile');

router.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end(`
            <div>
             <h3>上传成功</h3>
             <p class="center">请勿重复上传</p>
            </div>
    `);
  });
});

module.exports = router;