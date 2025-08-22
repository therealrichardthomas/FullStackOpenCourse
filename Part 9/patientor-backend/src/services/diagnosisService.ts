import diagnoses from '../../data/diagnosisEntries';

import { Diagnosis } from '../types';


const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};



export default {
  getDiagnoses
};