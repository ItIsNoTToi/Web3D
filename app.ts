
import app from './src/server';
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`Web3D running on http://localhost:${PORT}`);
});
