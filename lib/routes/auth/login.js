const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = (db) => {

  router.post('/', (req, res) => {

    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = $1', [email])
      .then(data => {
        if (data.rows[0] === undefined) {
          res.sendStatus(400);
        }
        
        return data
      })
      .then(data => {
        let responseObj = {}
        const passMatch = bcrypt.compareSync(password, data.rows[0].password)

        if (passMatch) {
          const id = data.rows[0].id
          const token = jwt.sign(id, process.env.SECRET_KEY)

          responseObj = {
            user: {
              id: data.rows[0].id,
              email: data.rows[0].email,
              user_name: data.rows[0].user_name
            },
            token: token
          }

          return responseObj;
        } else {
          res.sendStatus(403);
        }

        return responseObj;

      })
      .then(responseObj => {

        if (responseObj !== {}) {
          db.query('SELECT * FROM projects WHERE user_id = $1 ORDER BY id;', [responseObj.user.id])
            .then(projectData => {

              Promise.all(projectData.rows.map(async (project) => {

                const projectTasks = await db.query('SELECT * FROM tasks WHERE project_id = $1', [project.id]);
                
                project.tasks = projectTasks.rows
                
              }))
              .then(() => {
                responseObj.projects = projectData.rows;

                res.json(responseObj);
              });

            })
            .catch(err => console.log(err));
        } else {
          res.sendStatus(403);
        }
      })
      .catch(err => console.log(err));

  });

  return router;

}