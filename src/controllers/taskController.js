const { readTasks, updateTasks } = require('../data/taskStore');

const ALLOWED_FIELDS = new Set(['title', 'description', 'status', 'priority', 'assignee', 'project']);
const STATUSES = new Set(['pending', 'completed']);
const PRIORITIES = new Set(['low', 'medium', 'high']);

function parseId(rawId) {
  if (!/^\d+$/.test(rawId)) return null;
  const id = Number(rawId);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function invalidId(res) {
  return res.status(400).json({ success: false, message: 'Görev kimliği pozitif bir tam sayı olmalıdır.' });
}

function validateInput(input, { partial = false } = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return 'İstek gövdesi JSON nesnesi olmalıdır.';
  }

  const fields = Object.keys(input);
  if (fields.length === 0) return 'En az bir görev alanı gönderilmelidir.';

  const unknownFields = fields.filter((field) => !ALLOWED_FIELDS.has(field));
  if (unknownFields.length) return 'Desteklenmeyen alan: ' + unknownFields.join(', ') + '.';

  if ((!partial || input.title !== undefined) &&
      (typeof input.title !== 'string' || !input.title.trim())) {
    return 'title alanı boş olmayan bir metin olmalıdır.';
  }
  if (typeof input.title === 'string' && input.title.trim().length > 120) {
    return 'title en fazla 120 karakter olabilir.';
  }

  for (const field of ['description', 'assignee', 'project']) {
    if (input[field] !== undefined && typeof input[field] !== 'string') {
      return field + ' alanı metin olmalıdır.';
    }
  }
  if (typeof input.description === 'string' && input.description.length > 1000) {
    return 'description en fazla 1000 karakter olabilir.';
  }
  for (const field of ['assignee', 'project']) {
    if (typeof input[field] === 'string' && input[field].length > 120) {
      return field + ' en fazla 120 karakter olabilir.';
    }
  }
  if (input.status !== undefined && !STATUSES.has(input.status)) {
    return 'status pending veya completed olmalıdır.';
  }
  if (input.priority !== undefined && !PRIORITIES.has(input.priority)) {
    return 'priority low, medium veya high olmalıdır.';
  }
  return null;
}

async function createTask(req, res) {
  const validationError = validateInput(req.body);
  if (validationError) return res.status(400).json({ success: false, message: validationError });

  const created = await updateTasks((tasks) => {
    const id = tasks.reduce((max, task) => Math.max(max, Number(task.id) || 0), 0) + 1;
    const now = new Date().toISOString();
    const task = {
      id,
      title: req.body.title.trim(),
      description: req.body.description?.trim() || '',
      status: req.body.status || 'pending',
      priority: req.body.priority || 'medium',
      assignee: req.body.assignee?.trim() || '',
      project: req.body.project?.trim() || '',
      createdAt: now,
      updatedAt: now
    };
    tasks.push(task);
    return task;
  });
  return res.status(201).json({ success: true, data: created });
}

async function getAllTasks(req, res) {
  const tasks = await readTasks();
  return res.status(200).json({ success: true, count: tasks.length, data: tasks });
}

async function getTaskById(req, res) {
  const id = parseId(req.params.id);
  if (id === null) return invalidId(res);

  const task = (await readTasks()).find((item) => item.id === id);
  if (!task) return res.status(404).json({ success: false, message: id + ' kimlikli görev bulunamadı.' });
  return res.status(200).json({ success: true, data: task });
}

async function updateTask(req, res) {
  const id = parseId(req.params.id);
  if (id === null) return invalidId(res);

  const validationError = validateInput(req.body, { partial: true });
  if (validationError) return res.status(400).json({ success: false, message: validationError });

  const updated = await updateTasks((tasks) => {
    const index = tasks.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const changes = { ...req.body };
    for (const field of ['title', 'description', 'assignee', 'project']) {
      if (typeof changes[field] === 'string') changes[field] = changes[field].trim();
    }
    tasks[index] = { ...tasks[index], ...changes, id, updatedAt: new Date().toISOString() };
    return tasks[index];
  });

  if (!updated) return res.status(404).json({ success: false, message: id + ' kimlikli görev bulunamadı.' });
  return res.status(200).json({ success: true, data: updated });
}

async function deleteTask(req, res) {
  const id = parseId(req.params.id);
  if (id === null) return invalidId(res);

  const deleted = await updateTasks((tasks) => {
    const index = tasks.findIndex((item) => item.id === id);
    return index === -1 ? null : tasks.splice(index, 1)[0];
  });

  if (!deleted) return res.status(404).json({ success: false, message: id + ' kimlikli görev bulunamadı.' });
  return res.status(200).json({ success: true, message: 'Görev başarıyla silindi.', data: deleted });
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
