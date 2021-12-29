const router = require('express').Router();

module.exports = (db) => {

  router.delete('/', (req, res) => {

    const { taskId } = req.body;

    db.query('DELETE FROM tasks WHERE id = $1;', [taskId])
      .then(() => {
        res.send('Task Deleted');
      })
      .catch(err => console.log(err));

  });

  return router;

};