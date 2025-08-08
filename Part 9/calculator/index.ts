import express from 'express';

import { calculator, Operation } from './calculator';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});


app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if ( !value1 || isNaN(Number(value1)) || !value2 || isNaN(Number(value2)) ) {
    return res.status(400).send({ error: 'must be a number'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op as Operation);

  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});