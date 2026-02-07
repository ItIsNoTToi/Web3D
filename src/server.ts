import path from 'path';
import express from 'express';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.render('index', {
    title: 'Web3D Express Demo',
  });
});

app.post('/signup', (req, res) => {
  const { fullName, phone, service, note } = req.body as Record<string, string>;
  console.log('Signup:', { fullName, phone, service, note });
  res.status(200).json({ ok: true });
});

app.use(express.static(path.join(__dirname, '..', 'public')));

export default app;