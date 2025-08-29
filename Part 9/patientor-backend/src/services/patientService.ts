import patients from '../../data/patientEntries';
import { NonSensitivePatientEntry, NewPatientEntry, Patient, Entry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';


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
  const id: string = uuid();
  const newPatient = {
    id,
    ...patient,
    entries: []
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  const patientEntry = patients.find(patient => patient.id === id);
  return patientEntry;
};

const addEntry = (patient: Patient, newEntryData: EntryWithoutId): Entry => {
  const entryId: string = uuid();
  const newEntry = {
    id: entryId,
    ...newEntryData
  };
  patient.entries.unshift(newEntry);
  return newEntry;
};


export default {
  getPatients,
  addPatient,
  getPatientById,
  getNonSensitivePatientEntries,
  addEntry
};