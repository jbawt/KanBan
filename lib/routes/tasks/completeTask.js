const router = require('express').Router();

module.exports = (db) => {

  router.patch('/', (req, res) => {

    const { id } = req.body;
    const completed = true;

    db.query('UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *;', [completed, id])
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => console.log(err));

  });

  return router;

};