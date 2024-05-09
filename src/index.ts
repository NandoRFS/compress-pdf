import express from 'express';
import router from './router';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
