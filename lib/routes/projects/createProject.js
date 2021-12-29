const router = require('express').Router();
const jwt = require('jsonwebtoken');

module.exports = (db) => {

  router.post('/', (req, res) => {

    const {userId, title, description, dueDate} = req.body;
    const started = false;
    const completed = false;
    const archived = false;

    db.query('INSERT INTO projects (user_id, title, description, due_date, started, completed, archived) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;', [userId, title, description, dueDate, started, completed, archived])
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => console.log(err));

  });

  return router;

}