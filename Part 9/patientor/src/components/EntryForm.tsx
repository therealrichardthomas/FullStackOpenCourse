import { useState } from 'react';
import { Diagnosis, EntryWithoutId, HealthCheckRating } from '../types';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent
 } from '@mui/material';

interface EntryFormProps {
  onSubmit: (entry: EntryWithoutId) => Promise<void>;
  onCancel: () => void;
  diagnoses: Diagnosis[];
}


const EntryForm = ({ onSubmit, onCancel, diagnoses}: EntryFormProps) => {
  const style: React.CSSProperties = {
    border: '2px dashed black',
    padding: '10px',
    position: 'relative',
  };
  const cancelStyle: React.CSSProperties = {
    border: 'none',
    backgroundColor:'rgb(251, 74, 74)',
    padding: '5px 10px',
    borderRadius: '5px',
    boxShadow: '0px 2px rgb(91, 0, 0)'
  };
  const addStyle: React.CSSProperties = {
    border: 'none',
    padding: '5px 10px',
    position: 'absolute',
    right: '10px',
    backgroundColor: 'rgb(183, 183, 183)',
    borderRadius: '5px',
    boxShadow: '0px 2px gray'
  };

  const [entryType, setEntryType] = useState('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthRating, setHealthRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState('');
  const [sickStart, setSickStart] = useState('');
  const [sickEnd, setSickEnd] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const value = event.target.value;
    
    const newCodes = typeof value === 'string' ? value.split(',') : value;
    setDiagnosisCodes(newCodes); // Assuming 'setDiagnosisCodes' is your state setter
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined
    };
    let entryData: EntryWithoutId;

    switch(entryType) {
      case 'HealthCheck': 
        entryData = {
          ...baseEntry,
          type: entryType,
          healthCheckRating: healthRating
        };
        break;
      case 'OccupationalHealthcare':
        entryData = {
          ...baseEntry,
          type: entryType,
          employerName,
          ...(sickStart && sickEnd && {
            sickLeave: {
              startDate: sickStart,
              endDate: sickEnd,
            }
          })
        };
        break;
      case 'Hospital':
        entryData = {
          ...baseEntry,
          type: entryType,
          discharge: {
            date: dischargeDate,
            criteria,
          }
        };
        break;
      default:
        return;
    }

      onSubmit(entryData);
      resetForm();
  };

  const resetForm = () => {
    setEntryType('HealthCheck');
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setHealthRating(HealthCheckRating.Healthy);
    setEmployerName('');
    setSickStart('');
    setSickEnd('');
    setDischargeDate('');
    setCriteria('');
  };

  return (
    <div style={style}>
      <form onSubmit={handleSubmit}>
        <p>
          <strong> Entry type: </strong> &nbsp;
          Health Check<input type='radio' name="entryType" onChange={() => setEntryType('HealthCheck')} checked={entryType === 'HealthCheck'}/> &nbsp;
          Occupational Healthcare<input type='radio' name="entryType" onChange={() => setEntryType('OccupationalHealthcare')} checked={entryType === 'OccupationalHealthcare'}/> &nbsp;
          Hospital<input type='radio' name="entryType" onChange={() => setEntryType('Hospital')} checked={entryType === 'Hospital'}/>
        </p>
        <TextField type='text' label="Description" value={description} onChange={({target}) => setDescription(target.value)} fullWidth sx={{ mt: 1}} required/>

        <TextField type='date' label="Date" value={date} onChange={({target}) => setDate(target.value)} InputLabelProps={{shrink: true}} fullWidth sx={{ mt: 1}} required/>

        <TextField type='text' label="Specialist" value={specialist} onChange={({target}) => setSpecialist(target.value)} fullWidth sx={{ mt: 1}} required/>

        {entryType === 'HealthCheck' && 
          (
            <>
              <p>
                <strong>Healthcheck Rating: </strong> &nbsp;
                Healthy<input type='radio' name='health-rating' value={healthRating} onChange={() => setHealthRating(HealthCheckRating.Healthy)} defaultChecked/> &nbsp;
                Low Risk<input type='radio' name='health-rating' value={healthRating} onChange={() => setHealthRating(HealthCheckRating.LowRisk)} /> &nbsp;
                High Risk<input type='radio' name='health-rating' value={healthRating} onChange={() => setHealthRating(HealthCheckRating.HighRisk)} /> &nbsp;
                Critical Risk<input type='radio' name='health-rating' value={healthRating} onChange={() => setHealthRating(HealthCheckRating.CriticalRisk)} />
              </p>
            </>
          )
        }

        {entryType === 'OccupationalHealthcare' && (
          <>
            <TextField type='text' label="Employer Name" value={employerName} onChange={({target}) => setEmployerName(target.value)} fullWidth sx={{ mt: 1}} required/>
            <p style={{ display: 'flex', alignItems: 'center'}}>
              <TextField type='date' label="Sick Leave Start Date (optional)" value={sickStart} onChange={({target}) => setSickStart(target.value)} InputLabelProps={{shrink: true}} fullWidth sx={{ mt: 1}} /> &nbsp;&nbsp;
              <TextField type='date' label="Sick Leave End Date (optional)" value={sickEnd} onChange={({target}) => setSickEnd(target.value)} InputLabelProps={{shrink: true}} fullWidth sx={{ mt: 1}} />
            </p>
          </>
        )}

        {entryType === 'Hospital' && (
          <>
            <TextField type='date' label="Discharge date" value={dischargeDate} onChange={({target}) => setDischargeDate(target.value)} InputLabelProps={{shrink: true}} fullWidth sx={{mt: 1}} required />
            <TextField type='text' label="Criteria" value={criteria} onChange={({target}) => setCriteria(target.value)} fullWidth sx={{mt: 1}} required />
          </>
        )}

        <FormControl fullWidth sx={{mt: 1, mb: 1}}>
          <InputLabel id="diagnosis-codes-label">Diagnosis Codes (optional)</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            id="diagnosis-codes-select"
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            input={<OutlinedInput label="Diagnosis Codes (optional)" />}
            // This function controls how the selected values are displayed in the input field.
            renderValue={(selected) => selected.join(', ')}
          >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {/* Add a checkbox for better UX, showing what's currently selected */}
              <Checkbox checked={diagnosisCodes.includes(d.code)} />
              <ListItemText primary={`${d.code}: ${d.name}`} />
            </MenuItem>
          ))}
          </Select>
        </FormControl>

        <button style={cancelStyle} onClick={onCancel}>Cancel</button>
        <button style={addStyle} type='submit'>Add</button>
      </form>
    </div>
  );
};


export default EntryForm;