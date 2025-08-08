import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({
      error: 'malformmated parameters'
    });
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  const BmiResult = calculateBmi(heightNum, weightNum);
  return res.json({
    weight: weightNum,
    height: heightNum,
    bmi: BmiResult
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  const dailyHrs = daily_exercises as number[];

  if ( !target || !dailyHrs ) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if ( isNaN(Number(target)) || dailyHrs.some(isNaN)) {
    return res.status(400).json({ error: "malformatted parameters"});
  }
  
  const result = calculateExercises(dailyHrs, Number(target));
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});