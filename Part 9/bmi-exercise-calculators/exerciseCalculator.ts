
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  dailyHrs: number[];
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('not enough arguments');

  const dailyHrs = args.slice(3).map(Number); // converting string array to number array
  const target = Number(args[2]);

  if (isNaN(target) || dailyHrs.some(isNaN)) {
    throw new Error('all provided arguments must be numbers');
  }

  return {
    target,
    dailyHrs
  };
};

export const calculateExercises = (dailyHrs: number[], target: number): Result => {
  const periodLength: number = dailyHrs.length;
  const trainingDays: number = dailyHrs.filter(dayHrs => dayHrs > 0).length;

  const average: number = dailyHrs.reduce((sumHrs, hour) => {
    return sumHrs + hour;
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
  };
};

if (require.main === module) {
  try {
    const { target, dailyHrs } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHrs, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('something went wrong');
    }
  }
}