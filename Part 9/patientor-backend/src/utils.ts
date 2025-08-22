import { Gender, NewPatientEntry } from "./types";
import { z } from 'zod';


export const NewPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
  occupation: z.string()
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};


export default toNewPatientEntry;