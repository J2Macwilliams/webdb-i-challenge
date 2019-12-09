const express = require('express');

// Call db -  knex to better understand how to access the DB
const knex = require('../data/dbConfig');

const router = express.Router();

// Global GET endpoint-----------------------------------------------------
router.get('/', (req, res) => {
  knex
    .select('*')
    .from("accounts")
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      
      res.status(500).json({ errorMessage: "Error getting the data", error });
    });
});

// GET endpoint by Id-----------------------------------------------------
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
      res.status(500).json({ errorMessage: "Error getting the data", error });
    });
});


// POST endpoint for new projects with validation of necessary information
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

// PUT by ID to Update projects-----------------------------------------------------
router.put('/:id', ValidateId, (req, res) => {
  const id = req.params.id
  const change = req.body

  knex("accounts")
  // Always Filter on a PUT!!!!!!!!!!!!!!!!!!
    .where({ id }) 
    .update(change)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) updated.` });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Error updating the post", error
      });
    });
});

// DELETE by projects ID-----------------------------------------------------
router.delete('/:id', ValidateId, (req, res) => {
  const id = req.params.id

  knex("accounts")
  // Always filter on a DELETE!!!!!!!!!!!!!!!!!
  .where({id})
  .del()
  .then(deleted => {
    res.status(200).json({message: `${deleted} item(s) removed`})
  })
  .catch(error => {
    res.status(500).json({message: "error deleting item.", error})
  })
});

// Custom middleware-----------------------------------------------------
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