const express = require('express');

const knex = require('../data/dbConfig');

const router = express.Router();

// router.get('/', (req, res) => {
//     knex.select('*')
//     .from("budget")
//     .then(posts => {
//       res.status(200).json(posts);
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({ errorMessage: "Error getting the data" });
//     });
// });

module.exports = router;