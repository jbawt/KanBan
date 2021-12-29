const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (db) => {

  router.post('/', (req, res) => {

    const { id } = req.body;
    const header = req.headers['authorization'];
    let token;

    if (typeof header !== 'undefined') {

      const bearer = header.split(" ");
      token = bearer[1];

    } else {
      res.sendStatus(403);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if (err) {
        res.sendStatus(403);
      } else {
        db.query('SELECT * FROM users WHERE id = $1', [id])
          .then(data => {
            if (data.rows[0] === undefined) {
              res.sendStatus(400);
            }
        
            return data
          })
          .then(data => {

            let responseObj = {
              user: {
                id: data.rows[0].id,
                email: data.rows[0].email,
                user_name: data.rows[0].user_name
              }
            }
          
            return responseObj;
            
          })
          .then(responseObj => {

            if (responseObj !== {}) {
              db.query('SELECT * FROM projects WHERE user_id = $1', [responseObj.user.id])
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

      }
    })

  });

  return router;

}