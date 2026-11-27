const fs = require('node:fs/promises');
const path = require('node:path');

const DATA_FILE = path.join(__dirname, 'tasks.json');
let writeQueue = Promise.resolve();

async function readTasks() {
  try {
    const content = await fs.readFile(DATA_FILE, 'utf8');
    const tasks = JSON.parse(content);
    if (!Array.isArray(tasks)) throw new Error('Görev veri dosyasının kökü dizi olmalıdır.');
    return tasks;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, '[]\n', 'utf8');
    return [];
  }
}

async function saveTasks(tasks) {
  const temporaryFile = `${DATA_FILE}.tmp`;
  await fs.writeFile(temporaryFile, `${JSON.stringify(tasks, null, 2)}\n`, 'utf8');
  await fs.rename(temporaryFile, DATA_FILE);
}

function updateTasks(mutator) {
  const operation = writeQueue.then(async () => {
    const tasks = await readTasks();
    const result = await mutator(tasks);
    await saveTasks(tasks);
    return result;
  });
  writeQueue = operation.catch(() => {});
  return operation;
}

module.exports = { readTasks, updateTasks };
