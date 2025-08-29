import type { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';
import CodesDisplay from "./CodesDisplay";

interface OHCEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({entry, diagnoses}: OHCEntryProps) => {

  return (
    <div>
      {entry.date} <WorkIcon /> {entry.employerName}
      <p><em>{entry.description}</em></p>

      <CodesDisplay entry={entry} diagnoses={diagnoses} />
      diagnosed by {entry.specialist}
    </div>
  );
};

export default OccupationalHealthcareEntry;