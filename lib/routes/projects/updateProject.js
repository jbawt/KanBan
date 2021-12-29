const router = require('express').Router();

module.exports = (db) => {

  router.patch('/', (req, res) => {

    const { projectId, title, description, dueDate } = req.body;

    db.query('UPDATE projects SET title = $1, description = $2, due_date = $3 WHERE id = $4', [title, description, dueDate, projectId])
      .then(() => {
        res.send('Successfully Updated');
      })
      .catch(err => console.log(err));

  });

  return router;

}