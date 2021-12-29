const router = require('express').Router();

module.exports = (db) => {

  router.patch('/', (req, res) => {

    const { projectId } = req.body;
    const complete = true;

    db.query('UPDATE projects SET completed = $1 WHERE id = $2;', [complete, projectId])
      .then(() => {
        res.send('Project Completed');
      })
      .catch(err => console.log(err));

  });

  return router;

};