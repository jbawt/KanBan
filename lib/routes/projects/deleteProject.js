const router = require('express').Router();

module.exports = (db) => {

  router.delete('/', (req, res) => {

    const { projectId } = req.body;

    db.query('DELETE FROM projects WHERE id = $1;', [projectId])
      .then(() => {
        res.send('Successfully Deleted');
      })
      .catch(err => console.log(err));

  });

  return router;

}