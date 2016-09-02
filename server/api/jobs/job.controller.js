/**
 * Created by sdonose on 7/22/2016.
 */
'use strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import Job from './job.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    return res.status(statusCode).json(entity);
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.update(updates).then((entity)=>{
      return entity;
    });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Jobs
export function index(req, res) {
  return Job.find()
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function indexHistory(req,res) {
  return Job.historyModel().find().where('o').equals('r')
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}



// add comment Job from the DB
export function commentJob(req, res) {
  var commentsArr = [];
  commentsArr.push(req.body);
  Job.findById(req.params.id,function (err,results) {
      results.comments.push(req.body);
      results.save(function (err) {
        if(err) return handleError(err);
        res.send(results);
      })
    })
}

export function show(req, res) {
  return Job.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Job in the DB
export function create(req, res) {
  return Job.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Job in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Job.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then((entity) => {
      _.merge(entity, req.body);
      entity.set('for_agency', req.body.for_agency);
      return entity.save();
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Job from the DB
export function destroy(req, res) {
  return Job.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
