import patients from '../../data/patientEntries';
import { NonSensitivePatientEntry, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';
const id: string = uuid();


const getPatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient: NewPatientEntry ): Patient => {
  const newPatient = {
    id,
    ...patient
  };
  return newPatient;
};


export default {
  getPatients,
  addPatient
};