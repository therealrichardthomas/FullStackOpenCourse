import type { Diagnosis, HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CodesDisplay from './CodesDisplay';

interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({entry, diagnoses}: HospitalEntryProps) => {

  return (
    <div>
      {entry.date} <LocalHospitalIcon />
      <p><em>{entry.description}</em></p>
      
      <CodesDisplay entry={entry} diagnoses={diagnoses} />

      diagnosed by {entry.specialist}
    </div>
  );
};

export default HospitalEntry;