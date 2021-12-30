const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const path = require('path');

// DB SETUP
const { Pool } = require('pg');
const dbParams = require('./lib/db');
const db = new Pool(dbParams);
db.connect(() => {
  console.log(`connected to database`);
});

// EXPRESS CONFIG
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
};

// ROUTES
const login = require('./lib/routes/auth/login');
const register = require('./lib/routes/auth/register');
const checkAuth = require('./lib/routes/auth/checkAuth');
const createTask = require('./lib/routes/tasks/createTask');
const startTask = require('./lib/routes/tasks/startTask');
const completeTask = require('./lib/routes/tasks/completeTask');
const fixTask = require('./lib/routes/tasks/fixTask');
const deleteTask = require('./lib/routes/tasks/deleteTask');
const createProject = require('./lib/routes/projects/createProject');
const deleteProject = require('./lib/routes/projects/deleteProject');
const updateProject = require('./lib/routes/projects/updateProject');
const completeProject = require('./lib/routes/projects/completeProject');
const archiveProject = require('./lib/routes/projects/archiveProject');
const changePass = require('./lib/routes/user/changePass');
const updateUser = require('./lib/routes/user/updateUser');


// user
app.use('/api/change-pass', changePass(db));
app.use('/api/update-user', updateUser(db));


// auth
app.use('/api/login', login(db));
app.use('/api/register', register(db));
app.use('/api/check-auth', checkAuth(db));

// tasks
app.use('/api/create-task', createTask(db));
app.use('/api/start-task', startTask(db));
app.use('/api/complete-task', completeTask(db));
app.use('/api/fix-task', fixTask(db));
app.use('/api/delete-task', deleteTask(db));

// projects
app.use('/api/create-project', createProject(db));
app.use('/api/delete-project', deleteProject(db));
app.use('/api/update-project', updateProject(db));
app.use('/api/complete-project', completeProject(db));
app.use('/api/archive-project', archiveProject(db));

// catch all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../kanban-fronten/build/index.html"))
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})