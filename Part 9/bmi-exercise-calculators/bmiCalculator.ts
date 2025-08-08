
interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues=> {
  if (args.length < 4) throw new Error('not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (!isNaN(height) || !isNaN(weight)) {
    return {
      height,
      weight
    }
  } else {
    throw new Error('all provided arguments must be numbers');
  }

}


export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) throw new Error('Height and weight must be postiive values');
  const heightInM: number = height/100;
  const bmi: number = weight/(heightInM * heightInM);

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

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv)
    console.log(calculateBmi(height, weight))
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("something went wrong");
    }
  }
}