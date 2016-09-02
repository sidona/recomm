/**
 * Created by sdonose on 8/22/2016.
 */


import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import fs from 'fs';
import _ from 'underscore';
import User from '../../user/user.model';
import candidate from '../candidate.controller';

function UserEmail(name) {
  this.name=name;
}
console.log(UserEmail);
console.log('user------',User);



var transporter = nodemailer.createTransport(smtpTransport({
  host: 'smtp.pentalog.fr',
  port: 587,
  auth: {
    user: '',
    pass: ''
  }
}));

var mailOptions = {
  from: '',
  to: 'sidona_g@yahoo.com',
  subject: ' Recomandare noua',
  text:'test',
  html: getHtml()
};
function getHtml() {
  var path = 'server/views/email.html';
  var html = fs.readFileSync(path, 'utf8');

  var template = _.template(html);

  return template();
}
export function sendEmail(req,res) {

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }else{
      console.log('Message sent: ' + info.response);
      res.json('send email');

      console.log('user',User)

    }

  })
}

