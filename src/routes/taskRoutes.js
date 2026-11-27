const express = require('express');
const validateTask = require('../middleware/validateTask');
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const router = express.Router();

router.route('/')
  .get(getAllTasks)
  .post(validateTask(), createTask);

router.route('/:id')
  .get(getTaskById)
  .put(validateTask({ partial: true }), updateTask)
  .delete(deleteTask);

module.exports = router;
