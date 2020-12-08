const multer = require('multer')
const path = require('path')
const {deletePhoto} = require('../models/users')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './image')
  },
  filename: function (req, file, cb) {
    const {myId} = req
    deletePhoto(myId)
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage, 
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname).toLocaleLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

module.exports = {
  uploadMulter: upload
}
