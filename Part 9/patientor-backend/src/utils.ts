import { Gender, NewPatientEntry, HealthCheckRating } from "./types";
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

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.enum(HealthCheckRating)
}).strict();

const SickLeaveSchema = z.object({
  startDate: z.iso.date(),
  endDate: z.iso.date()
});

const OccupationalHealthcareEntry = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional()
}).strict();

const DischargeEntrySchema = z.object({
  date: z.iso.date(),
  criteria: z.string()
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: DischargeEntrySchema
}).strict();

export const NewEntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntry,
  HospitalEntrySchema
]);

export const toNewEntry = (object: unknown) => {
  return NewEntrySchema.parse(object);
};

export default toNewPatientEntry;