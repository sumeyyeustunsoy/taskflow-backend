const express = require('express');
const requestLogger = require('./middleware/logger');
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(requestLogger);
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'TASKFLOW API çalışıyor.' });
});
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint bulunamadı.' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ success: false, message: 'Geçersiz JSON gövdesi.' });
  }
  console.error(`[${new Date().toISOString()}] ${error.stack || error.message}`);
  return res.status(500).json({ success: false, message: 'Beklenmeyen bir sunucu hatası oluştu.' });
});

app.listen(PORT, () => {
  console.log(`TASKFLOW API http://localhost:${PORT} adresinde çalışıyor.`);
});
