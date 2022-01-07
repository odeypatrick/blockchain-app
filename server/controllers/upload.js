const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: 'us-east-1',
    
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
})

module.exports = { upload };