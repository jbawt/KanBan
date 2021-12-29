const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = (db) => {

  router.post('/', (req, res) => {

    const { email, password, userName } = req.body;
    const lowerCaseEmail = email.trim().toLowerCase();
    const saltRounds = 10;

    db.query("SELECT * FROM users WHERE user_name = $1", [userName])
      .then(data => {
        if (data.rows[0] !== undefined) {
          res.sendStatus(403);
        } else {
          db.query('SELECT * FROM users WHERE email = $1', [email])
            .then(data => {
      
              if (data.rows[0] !== undefined) {
      
                res.sendStatus(400);
                
              } else {
                
                bcrypt.genSalt(saltRounds)
                  .then(salt => {
                    return  bcrypt.hash(password, salt);
                  })
                  .then(hash => {
                    db.query('INSERT INTO users (email, password, user_name) VALUES ($1, $2, $3) RETURNING *;', [lowerCaseEmail, hash, userName])
                      .then(data => {
      
                        const token = jwt.sign(data.rows[0].id, process.env.SECRET_KEY);
      
                        const responseObj = {
                          user: {
                            id: data.rows[0].id,
                            email: data.rows[0].email,
                            user_name: data.rows[0].user_name
                          },
                          token: token
                        }
      
                        res.json(responseObj);
                      })     
                  })
                  .catch(err => console.log(err));
      
              }
            })
        }
      })

  });

  return router;

}