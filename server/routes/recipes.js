var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/samanthaklein';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM recipe', function (err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var recipe = req.body;
  var recipe_id = 0;
  console.log(recipe);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query('INSERT INTO recipe (title, citation, source, rating) ' +
                  'VALUES ($1, $2, $3, $4) RETURNING id INTO recipe_id',
                   [recipe.title, recipe.citation, recipe.source, recipe.rating],
                 function (err, result) {

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }
                   console.log(recipe_id);
                  //  client.query('INSERT INTO dates (date_made, recipe_id) ' + 'VALUES ($1, $2)',
                  //  [recipe.date_made, recipe_id],
                  // function (err, result) {
                  //   done();
                  //   if (err) {
                  //     res.sendStatus(500);
                  //     return;
                  //   }

                   res.sendStatus(201);
                   //})

                 });
  });
});
//
// router.delete('/delete/:id', function(req, res) {
//     var id = req.params.id;
//     pg.connect(connectionString, function(err, client, done) {
//             if (err) {
//                 console.log('connection err');
//                 res.sendStatus(500);
//             }
//             client.query('DELETE FROM books ' +
//                          'WHERE id = $1 ',
//                          [id],
//                 function(err, result) {
//                     done();
//                     if (err) {
//                         console.log('put err');
//                         res.sendStatus(500);
//                         return;
//                     }
//                     res.sendStatus(204);
//                 });
//     });
// });



module.exports = router;
