/**
 * Created by sdonose on 7/22/2016.
 */
"use strict";

import mongoose from 'mongoose';



var CndidateSchema = new mongoose.Schema({
  skill: {type: String},
  relation: {type: String},
  full_name: {type: String},
  email:{type:String},
  information: {type: String},
  cv_file: mongoose.Schema.Types.Mixed,
  for_agency: {type: String},
  status: {type: String, default:'Propus'},
  comment: {type: String},
  recommend_by: {type: String},
  experience: {type: String},
  created_at: {type: Date,default: Date.now},
  updated_at: {type: Date, default: Date.now},
  deleted_at: {type: Date, default: Date.now},
  jobTitle:{type:String},
  job: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'Job'
    }


});

export default mongoose.model('Candidate', CndidateSchema);
