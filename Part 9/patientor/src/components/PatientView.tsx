import { Diagnosis, Patient, EntryWithoutId } from "../types";
import { useParams } from 'react-router-dom';
import EntryDetails from "./EntryDetails/EntryDetails";
import patientService from '../services/patients';
import { Button } from "@mui/material";
import { useState } from 'react';
import EntryForm from './EntryForm';

interface PatientsProps {
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  patients: Patient[];
  diagnoses: Diagnosis[]
}

const PatientView = ({ setPatients, patients, diagnoses }: PatientsProps) => {
  const [formState, setFormState] = useState(false);

  const id = useParams().id;
  if (!id ) {
    return;
  }
  const findPatient = patients.find(patient => patient.id === id);

  const style = {
    border: '2px solid black',
    borderRadius: '5px',
    padding: '10px',
    margin: '5px'
  };

  const onSubmit = async (entry: EntryWithoutId) => {
      const newEntry = await patientService.createEntry(id, entry);
  
      setPatients(prevPatients => prevPatients.map(patient => {
        return patient.id !== id ? patient : {...patient, entries: [newEntry, ...patient.entries]};
      }));

      closeForm();
  };

  const closeForm = () => setFormState(false);
  const openForm = () => setFormState(true);

  return (
    <div>
      <div style={{ marginTop: '10px', marginBottom: '30px'}}>
        <h2 style={{display: 'inline'}}>{findPatient?.name}</h2> &nbsp;&nbsp;<p style={{display: 'inline'}}>{findPatient?.gender}</p>
        <p><strong>DOB: </strong>{findPatient?.dateOfBirth}</p>
        <p><strong>ssn: </strong>{findPatient?.ssn}</p>
        <p><strong>occupation: </strong>{findPatient?.occupation}</p>
      </div>

      {formState && 
        <EntryForm onSubmit={onSubmit} onCancel={closeForm} diagnoses={diagnoses} />
      }

      <div>
        <h2>entries</h2>
        {findPatient?.entries.map(entry => (
          <div style={style} key={entry.id}>
            <EntryDetails entry={entry} diagnoses={diagnoses} />
          </div>
        ))}
      </div>

      <Button onClick={() => openForm()} variant="contained" color="primary">
        Add new patient entry
      </Button>

    </div>
  );
};

export default PatientView;