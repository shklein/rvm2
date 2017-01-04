var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/samanthaklein';

router.post('/', function (req, res) {
  var recipe = req.body;
  console.log(recipe);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('INSERT INTO recipe (title, citation, source, rating) ' +
                  'VALUES ($1, $2, $3, $4) RETURNING id',
                   [recipe.title, recipe.citation, recipe.source, recipe.rating],
                 function (err, result) {

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   client.query('INSERT INTO dates (date_made, recipe_id) ' + 'VALUES ($1, $2)',
                   [recipe.date_made, recipe_id],
                  function (err, result) {
                    done();
                    if (err) {
                      res.sendStatus(500);
                      return;
                    }
                    console.log('Date saved');
                   res.sendStatus(201);
                   })

                 });
  });

});

  module.exports = router;
