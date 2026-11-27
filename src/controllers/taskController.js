const { readTasks, updateTasks } = require('../data/taskStore');

function parseId(rawId) {
  if (!/^\d+$/.test(rawId)) return null;
  const id = Number(rawId);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function invalidId(res) {
  return res.status(400).json({ success: false, message: 'Görev kimliği pozitif bir tam sayı olmalıdır.' });
}

async function createTask(req, res) {
  const created = await updateTasks((tasks) => {
    const id = tasks.reduce((max, task) => Math.max(max, Number(task.id) || 0), 0) + 1;
    const now = new Date().toISOString();
    const task = {
      id,
      title: req.taskInput.title,
      description: req.taskInput.description || '',
      status: req.taskInput.status || 'pending',
      priority: req.taskInput.priority || 'medium',
      assignee: req.taskInput.assignee || '',
      project: req.taskInput.project || '',
      createdAt: now,
      updatedAt: now
    };
    tasks.push(task);
    return task;
  });
  return res.status(201).json({ success: true, data: created });
}

async function getAllTasks(req, res) {
  let tasks = await readTasks();
  const { status, priority, assignee, project, search } = req.query;

  if (status) tasks = tasks.filter((task) => task.status === status);
  if (priority) tasks = tasks.filter((task) => task.priority === priority);
  if (assignee) tasks = tasks.filter((task) => task.assignee.toLocaleLowerCase('tr') === assignee.toLocaleLowerCase('tr'));
  if (project) tasks = tasks.filter((task) => task.project.toLocaleLowerCase('tr') === project.toLocaleLowerCase('tr'));
  if (search) {
    const keyword = search.toLocaleLowerCase('tr');
    tasks = tasks.filter((task) => `${task.title} ${task.description}`.toLocaleLowerCase('tr').includes(keyword));
  }

  const total = tasks.length;
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));
  const sortBy = ['createdAt', 'updatedAt', 'title', 'priority', 'status'].includes(req.query.sortBy)
    ? req.query.sortBy
    : 'createdAt';
  const direction = req.query.order === 'asc' ? 1 : -1;

  tasks.sort((a, b) => {
    const left = a[sortBy];
    const right = b[sortBy];
    return (left > right ? 1 : left < right ? -1 : 0) * direction;
  });

  return res.status(200).json({
    success: true,
    count: tasks.length,
    total,
    page,
    limit,
    data: tasks.slice((page - 1) * limit, page * limit)
  });
}

async function getTaskById(req, res) {
  const id = parseId(req.params.id);
  if (id === null) return invalidId(res);
  const task = (await readTasks()).find((item) => item.id === id);
  if (!task) return res.status(404).json({ success: false, message: `${id} kimlikli görev bulunamadı.` });
  return res.status(200).json({ success: true, data: task });
}

async function updateTask(req, res) {
  const id = parseId(req.params.id);
  if (id === null) return invalidId(res);
  const updated = await updateTasks((tasks) => {
    const index = tasks.findIndex((item) => item.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...req.taskInput, id, updatedAt: new Date().toISOString() };
    return tasks[index];
  });
  if (!updated) return res.status(404).json({ success: false, message: `${id} kimlikli görev bulunamadı.` });
  return res.status(200).json({ success: true, data: updated });
}

async function deleteTask(req, res) {
  const id = parseId(req.params.id);
  if (id === null) return invalidId(res);
  const deleted = await updateTasks((tasks) => {
    const index = tasks.findIndex((item) => item.id === id);
    return index === -1 ? null : tasks.splice(index, 1)[0];
  });
  if (!deleted) return res.status(404).json({ success: false, message: `${id} kimlikli görev bulunamadı.` });
  return res.status(200).json({ success: true, message: 'Görev başarıyla silindi.', data: deleted });
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask, readTasks };
