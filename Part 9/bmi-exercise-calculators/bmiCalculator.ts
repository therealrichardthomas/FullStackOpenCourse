

const calculateBmi = (args: string[]): string => {
  if (args.length < 4) throw new Error('not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('all provided arguments must be numbers');
  }

  const heightInM: number = Number(args[2])/100;
  const bmi: number = Number(args[3])/(heightInM * heightInM);

  if (bmi < 16.0) {
    return "Underweight (severe thinness)";
  } else if (bmi < 17) {
    return "Underweight (moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (mild thinness)";
  } else if (bmi < 25.0) {
    return "Normal range";
  } else if (bmi < 30.0) {
    return "Overweight (pre-obese)";
  } else if (bmi < 35.0) {
    return "Obese (Class I)";
  } else if (bmi < 40.0) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
}

try {
  console.log(calculateBmi(process.argv))
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log("something went wrong");
  }
}