const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());

app.get('/notes', (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const size = parseInt(req.query.size || '20', 10);
  const notes = db.all().slice((page - 1) * size, page * size);
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { title, body } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  res.status(201).json(db.create(title, body || ''));
});

app.get('/notes/:id', (req, res) => {
  const note = db.get(req.params.id);
  if (!note) return res.status(404).json({ error: 'not found' });
  res.json(note);
});

app.delete('/notes/:id', (req, res) => {
  db.remove(req.params.id);
  res.status(204).end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('notes-api listening on ' + port));
