/**
 * Created by sdonose on 7/22/2016.
 */
'use strict';

var express = require('express');
var fs = require('fs');
var path=require('path');
var multer=require('multer');
var mime=require('mime');
var __=require('underscore');
var sendEmail=require('./sendEmail/sendEmail');
var uploadDir=__dirname+'../../upload/';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  limits: {fileSize: 1000000, files:1}
});
var upload = multer({ storage: storage }).single('file');

var controller = require('./candidate.controller');



var router = express.Router();



router.get('/', controller.index);
router.get('/without',controller.indexCandidates);
router.get('/:id', controller.show);
router.get('/recommend/:recommend_by', controller.searchByRecommend);
router.get('/candidatesJob/:job',controller.searchByJob);
router.get('/myApply/:recommend_by',controller.myApplyJob);
router.post('/', controller.create);
router.get('/send/sendEmail',sendEmail.sendEmail);

router.post('/upload',upload,function (req,res) {
  console.log(req);

  //save to database
  console.log(req);
  console.log(req.file.originalname);
  console.log(req.file.originalname);
  res.json(req.file[0]);
});


router.get('/download/:file(*)',function (req,res,next) {
  var file=req.params.file;
  var pathFile=__dirname+'../../upload/'+file;
  console.log('file',req.params.file);
  res.download(pathFile);
});

router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
