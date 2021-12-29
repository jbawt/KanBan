const router = require('express').Router();

module.exports = (db) => {

  router.patch('/', (req, res) => {

    const { id } = req.body;

    db.query('UPDATE tasks SET started = $1 WHERE id = $2 RETURNING *;', [true, id])
      .then(data => {
        db.query('UPDATE projects SET started = $1 WHERE id = $2 RETURNING *;', [true, data.rows[0].project_id])
          .catch(err => console.log(err));
        
        return data
      })
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => console.log(err));

  });

  return router;

}