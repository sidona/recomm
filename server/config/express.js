/**
 * Express configuration
 */

'use strict';

import express from 'express';
import _ from 'underscore';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import busboy from 'connect-busboy';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import lusca from 'lusca';
import config from './environment';
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
var MongoStore = connectMongo(session);
import fs from 'fs';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

export default function(app) {
  var env = app.get('env');

  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
  }

  if (env === 'production') {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  }

  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath')));
  app.use(morgan('dev'));

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.json());
  app.use(busboy());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  //app.use(passport.session());

  //var transporter = nodemailer.createTransport('smtps://sidmadalina%40gmail.com:brasov23152@smtp.gmail.com');


  var mailOptions = {
    from: '<sidmadalina@gmail.com>',
    to: 'sidmadalina@gmail.com',
    subject: ' Account Verification',
    text:'test',
    html: getHtml()
  };
  function getHtml() {
    var path = 'server/views/email.html';
    var html = fs.readFileSync(path, 'utf8');

    var template = _.template(html);

    return template();
  }

  app.get('/sendmail', function (req, res) {

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });

  });

  // Persist sessions with MongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions
  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      db: 'recom-node'
    })
  }));


  /**
   * Lusca - express server security
   * https://github.com/krakenjs/lusca
   */
  // if (env !== 'test' && !process.env.SAUCE_USERNAME) {
  //   app.use(lusca({
  //     csrf: {
  //       angular: true
  //     },
  //     xframe: 'SAMEORIGIN',
  //     hsts: {
  //       maxAge: 31536000, //1 year, in seconds
  //       includeSubDomains: true,
  //       preload: true
  //     },
  //     xssProtection: true
  //   }));
  // }



  if ('development' === env) {
    app.use(require('connect-livereload')({
      ignore: [
        /^\/api\/(.*)/,
        /\.js(\?.*)?$/, /\.css(\?.*)?$/, /\.svg(\?.*)?$/, /\.ico(\?.*)?$/, /\.woff(\?.*)?$/,
        /\.png(\?.*)?$/, /\.jpg(\?.*)?$/, /\.jpeg(\?.*)?$/, /\.gif(\?.*)?$/, /\.pdf(\?.*)?$/
      ]
    }));
  }

  if ('development' === env || 'test' === env) {
    app.use(errorHandler()); // Error handler - has to be last
  }
}
