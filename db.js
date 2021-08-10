const Database = require('better-sqlite3');
const db = new Database('notes.db');
db.exec('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, created_at TEXT)');

module.exports = {
  all: () => db.prepare('SELECT * FROM notes ORDER BY created_at DESC').all(),
  get: (id) => db.prepare('SELECT * FROM notes WHERE id = ?').get(id),
  create: (title, body) => {
    const r = db.prepare('INSERT INTO notes (title, body, created_at) VALUES (?, ?, ?)')
      .run(title, body, new Date().toISOString());
    return db.prepare('SELECT * FROM notes WHERE id = ?').get(r.lastInsertRowid);
  },
  remove: (id) => db.prepare('DELETE FROM notes WHERE id = ?').run(id),
};
