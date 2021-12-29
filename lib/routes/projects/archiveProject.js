const router = require('express').Router();

module.exports = (db) => {

  router.patch('/', (req, res) => {

    const { projectId } = req.body;
    const archived = true;

    db.query('UPDATE projects SET archived = $1 WHERE id = $2', [archived, projectId])
      .then(() => {
        res.send("Project Archived");
      })
      .catch(err => console.log(err));

  });

  return router;

};