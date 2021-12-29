const router = require('express').Router();

module.exports = (db) => {

  router.patch('/', (req, res) => {

    const {userId, newEmail, newUserName } = req.body;

    db.query('UPDATE users SET email = $1, user_name = $2 WHERE id = $3 RETURNING *;', [newEmail, newUserName, userId])
      .then(data => {
        const resObj = {
          id: data.rows[0].id,
          email: data.rows[0].email,
          user_name: data.rows[0].user_name
        }

        res.json(resObj);
      })
      .catch(err => console.log(err));

  });

  return router;

}