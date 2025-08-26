import { Patient } from "../types";
import { useParams } from 'react-router-dom';

interface PatientsProps {
  patients: Patient[]
}

const PatientView = ({ patients }: PatientsProps) => {
  const id = useParams().id;
  const findPatient = patients.find(patient => patient.id === id);

  return (
    <div style={{ marginTop: '20px'}}>
      <h2 style={{display: 'inline'}}>{findPatient?.name}</h2> &nbsp;&nbsp;<p style={{display: 'inline'}}>{findPatient?.gender}</p>
      <p><strong>DOB: </strong>{findPatient?.dateOfBirth}</p>
      <p><strong>ssn: </strong>{findPatient?.ssn}</p>
      <p><strong>occupation: </strong>{findPatient?.occupation}</p>
    </div>
  );
};

export default PatientView;