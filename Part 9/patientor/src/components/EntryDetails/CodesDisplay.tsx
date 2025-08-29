import { Diagnosis, Entry } from "../../types";

interface CodesDisplayProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const CodesDisplay = ({entry, diagnoses}: CodesDisplayProps) => {

  return (
    <ul>
      {entry.diagnosisCodes?.map(code => {
        const diagnosis = diagnoses.find(d => d.code === code);

        return (
          <li key={code}>{code} {diagnosis?.name}</li>
        );
      })}
    </ul> 
  );
};


export default CodesDisplay;
