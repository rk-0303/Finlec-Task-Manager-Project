const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// This line is where the typo likely was. Let's fix it.
const { getTasks, createTask, updateTask, deleteTask, getTaskById } = require('../controllers/taskController');

// You can now remove the console.log line, as it has done its job.

router.route('/').get(auth, getTasks).post(auth, createTask);

router.route('/:id').get(auth, getTaskById).put(auth, updateTask).delete(auth, deleteTask);

module.exports = router;