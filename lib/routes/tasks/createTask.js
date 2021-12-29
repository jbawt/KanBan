const router = require('express').Router();

module.exports = (db) => {

  router.post('/', (req, res) => {

    const { title, description, projectId } = req.body;
    const started = false;
    const completed = false;

    db.query('INSERT INTO tasks (project_id, title, description, started, completed) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [projectId, title, description, started, completed])
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => console.log(err));

  });

  return router;

}