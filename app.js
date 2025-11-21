import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import os from 'os';

const hostname = os.hostname();
const app = express();

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
  res.render('index', { data: { nodeVersion: NodeVersion.node, title: '---- Docker alkalmazás példa ----', host: hostname } });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
