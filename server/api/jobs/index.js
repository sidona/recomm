/**
 * Created by sdonose on 7/22/2016.
 */
'use strict';

var express = require('express');
var controller = require('./job.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/history', controller.indexHistory);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/:id', controller.commentJob);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
