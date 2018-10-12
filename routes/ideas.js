const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// load idea model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Idea index page
router.get('/', (req, res) => {
  Idea.find({})
    .sort({date: 'desc'})
    .then((ideas) => {
      res.render('ideas/index', {
        ideas: ideas
      });
    })
});

// Add idea form
router.get('/add', (req, res) => {
  res.render('ideas/add');
});

// Edit idea form
router.get('/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    res.render('ideas/edit', {
      idea:idea
    });
  });
});

// Process add form
router.post('/', (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!req.body.details) {
    errors.push({ text: 'Please add some details' });
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newIdea = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newIdea)
      .save()
      .then(idea => {
        req.flash('success_msg', 'New video idea added');
        res.redirect('/ideas');
      });
  }
});

// Process edit form
router.put("/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    // new values
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save()
      .then(idea => {
        req.flash('success_msg', 'Video idea updated');
        res.redirect('/ideas');
      })
  });
});

// Delete idea
router.delete('/:id', (req, res) => {
  Idea.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Video idea removed');
      res.redirect('/ideas');
    });
});


module.exports = router;
