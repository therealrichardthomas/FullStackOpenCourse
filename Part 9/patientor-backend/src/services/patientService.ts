import patients from '../../data/patientEntries';
import { NonSensitivePatientEntry, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';
const id: string = uuid();


const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
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
    ...patient,
    entries: []
  };
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  const patientEntry = patients.find(patient => patient.id === id);
  return patientEntry;
};


export default {
  getPatients,
  addPatient,
  getPatientById,
  getNonSensitivePatientEntries
};