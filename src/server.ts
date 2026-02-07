import path from 'path';
import express from 'express';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

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

app.listen(PORT, () => {
  console.log(`Web3D running on http://localhost:${PORT}`);
});
