const { readTasks } = require('./taskController');

async function getSummary(req, res) {
  const tasks = await readTasks();
  const byStatus = { pending: 0, completed: 0 };
  const byPriority = { low: 0, medium: 0, high: 0 };
  for (const task of tasks) {
    byStatus[task.status] = (byStatus[task.status] || 0) + 1;
    byPriority[task.priority] = (byPriority[task.priority] || 0) + 1;
  }
  return res.status(200).json({ success: true, data: { total: tasks.length, byStatus, byPriority } });
}

module.exports = { getSummary };
