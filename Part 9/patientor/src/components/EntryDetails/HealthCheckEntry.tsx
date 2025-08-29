import type { Diagnosis, HealthCheckEntry } from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CodesDisplay from './CodesDisplay';

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({entry, diagnoses}: HealthCheckEntryProps) => {

  return (
    <div>
      {entry.date} 
      <MedicalServicesIcon /> 
      <p><em>{entry.description}</em></p>

      <CodesDisplay entry={entry} diagnoses={diagnoses} />
      diagnosed by {entry.specialist}
    </div>
  );
};

export default HealthCheckEntry;