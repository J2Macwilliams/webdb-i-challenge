const express = require('express');

const knex = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  knex
    .select('*')
    .from("accounts")
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the data" });
    });
});

router.get('/:id', ValidateId, (req, res) => {
  const id = req.params.id

  knex
    .from("accounts")
    .where({ id })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the data" });
    });
});



router.post('/', validatePostInfo, (req, res) => {
  const postInfo = req.body
  knex("accounts")
    .insert(postInfo)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "Error adding the post", error });
    });
});



function validatePostInfo(req, res, next) {
  const postInfo = req.body

  if (!postInfo) {
    res.status(404).json({ errorMessage: "Missing Necessary information" })
  } else {
    next();
  }
}

function ValidateId(req, res, next) {
  const id = req.params.id

  if (!id) {
    res.status(400).json({ message: "Wrong Id" })
  } else {
    next();
  }
}


module.exports = router;