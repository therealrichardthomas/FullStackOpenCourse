import express from 'express';
import { calculateBmi } from './bmiCalculator'

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({
      error: 'malformmated parameters'
    })
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  const BmiResult = calculateBmi(heightNum, weightNum);
  return res.json({
    weight: weightNum,
    height: heightNum,
    bmi: BmiResult
  })
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});