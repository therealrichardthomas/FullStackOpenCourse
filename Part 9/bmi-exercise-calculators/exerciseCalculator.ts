
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}


const calculateExercises = (args: string[]): Result => {
  if (args.length < 4) throw new Error('not enough arguments');

  const period = args.slice(3).map(Number); // converting string array to number array
  const target = Number(args[2]);

  if (isNaN(target) || period.some(isNaN)) {
    throw new Error('all provided arguments must be numbers');
  }

  const periodLength: number = args.length - 3; // -3: two for scripts and one for the target
  const trainingDays: number = period.filter(dayHrs => Number(dayHrs) > 0).length;

  const average: number = period.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0) / periodLength;

  const success: boolean = average >= target;
  const rating: number = !success ? 1 : (average >= (target*1.25) ? 3 : 2);
  let ratingDescription: string;

  if (rating === 1) {
    ratingDescription = 'you need to pick it up';
  } else if (rating === 2) {;
    ratingDescription = 'good enough but you can do better';
  } else {
    ratingDescription = 'phenomenal performance';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  console.log(calculateExercises(process.argv));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log('something went wrong');
  }
}