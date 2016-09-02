/**
 * Created by sdonose on 7/26/2016.
 */
'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';

var router = express.Router();

router.get('/',  function(req, res) {
  res.json({ title: 'Express' });
});

var fn = passport.authenticate('ldapauth', {session: false});
router.post('/', function(req, res, next) {
  passport.authenticate('ldapauth',{session:false}, function(err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user._id, user.role);
    res.json({ token });
  })(req, res, next)
});


export default router;
