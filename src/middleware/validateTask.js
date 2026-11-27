const ALLOWED_FIELDS = new Set(['title', 'description', 'status', 'priority', 'assignee', 'project']);
const STATUSES = new Set(['pending', 'completed']);
const PRIORITIES = new Set(['low', 'medium', 'high']);

function validateTask({ partial = false } = {}) {
  return (req, res, next) => {
    const body = req.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return res.status(400).json({ success: false, message: 'İstek gövdesi JSON nesnesi olmalıdır.' });
    }

    const fields = Object.keys(body);
    if (fields.length === 0) {
      return res.status(400).json({ success: false, message: 'En az bir görev alanı gönderilmelidir.' });
    }

    const unknownFields = fields.filter((field) => !ALLOWED_FIELDS.has(field));
    if (unknownFields.length) {
      return res.status(400).json({ success: false, message: `Desteklenmeyen alan: ${unknownFields.join(', ')}.` });
    }

    if (!partial && (typeof body.title !== 'string' || !body.title.trim())) {
      return res.status(400).json({ success: false, message: 'title alanı zorunludur ve boş olamaz.' });
    }
    if (partial && body.title !== undefined && (typeof body.title !== 'string' || !body.title.trim())) {
      return res.status(400).json({ success: false, message: 'title alanı boş olamaz.' });
    }

    for (const field of ['description', 'assignee', 'project']) {
      if (body[field] !== undefined && typeof body[field] !== 'string') {
        return res.status(400).json({ success: false, message: `${field} alanı metin olmalıdır.` });
      }
    }
    if (body.status !== undefined && !STATUSES.has(body.status)) {
      return res.status(400).json({ success: false, message: 'status pending veya completed olmalıdır.' });
    }
    if (body.priority !== undefined && !PRIORITIES.has(body.priority)) {
      return res.status(400).json({ success: false, message: 'priority low, medium veya high olmalıdır.' });
    }

    req.taskInput = { ...body };
    if (typeof req.taskInput.title === 'string') req.taskInput.title = req.taskInput.title.trim();
    for (const field of ['description', 'assignee', 'project']) {
      if (typeof req.taskInput[field] === 'string') req.taskInput[field] = req.taskInput[field].trim();
    }
    next();
  };
}

module.exports = validateTask;
