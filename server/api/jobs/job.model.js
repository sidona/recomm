/**
 * Created by sdonose on 7/22/2016.
 */
"use strict";

import mongoose from 'mongoose';
import mongooseHistory from 'mongoose-history';


var JobSchema = new mongoose.Schema({
  skill: {type: String},
  title: {type: String},
  description: {type: String},
  client_type: {type: String, default:'nu'},
  contact_person: {type: String},
  available_places: {type: Number},
  experience: {type: String},
  priority: {type: String},
  for_agency: [{type:String}],
  job_type: {type: Boolean, default: true},
  created_at: {type: Date,default: Date.now},
  deleted_at: {type: Date, default: Date.now},
  comments:[
    {
      comment:{type:String},
      author:{type:String},
      created_at: {type: Date,default: Date.now}
    }
  ]

});
JobSchema.path('title').validate(function (v) {
  return v.length <100;
});

var options={customCollectionName:"jobs_hst"};
JobSchema.plugin(mongooseHistory,options);

export default mongoose.model('Job', JobSchema)
