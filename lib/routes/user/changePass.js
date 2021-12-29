const router = require('express').Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

  router.patch('/', (req, res) => {

    const { email, password, newPassword } = req.body;

    db.query('SELECT * FROM users WHERE email = $1', [email])
      .then(data => {
        if (data.rows[0] === undefined) {
          return res.sendStatus(400);
        }

        return data;
      })
      .then(data => {

        
        const passMatch = bcrypt.compareSync(password, data.rows[0].password);
        const userId = data.rows[0].id

        if (passMatch) {

          const saltRounds = 10;

          bcrypt.genSalt(saltRounds)
            .then(salt => {
              return bcrypt.hash(newPassword, salt);
            })
            .then(hash => {
              db.query('UPDATE users SET password = $1 WHERE id = $2;', [hash, userId])
                .then(() => {
                  res.send("Password Updated");
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

        } else {

          res.sendStatus(400);

        }

      })

  });

  return router;

}