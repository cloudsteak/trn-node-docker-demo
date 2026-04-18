import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import os from 'os';

const hostname = os.hostname();
const app = express();

const uzenetLista = [];

// view engine setup
app.set('views', path.join(path.dirname(new URL(import.meta.url).pathname), 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(new URL(import.meta.url).pathname), 'public')));

/* Kezdőlap */
app.get('/', (req, res) => {
  const NodeVersion = process.versions;
  res.render('index', { data: { nodeVersion: NodeVersion.node, title: 'Webalkalmazás az Azureban (2026)', host: hostname }, uzenetLista });
});

/* Mentés */
app.post('/save', (req, res, next) => {
  const uzenet = (req.body.uzenet || '').trim();
  if (!uzenet || uzenet.length < 3 || !/^[a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$/.test(uzenet)) {
    return next(createError(400, 'Érvénytelen üzenet! Minimum 3 karakter, csak betűk, számok és szóköz megengedett.'));
  }
  uzenetLista.push(uzenet);
  return res.redirect('/');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
