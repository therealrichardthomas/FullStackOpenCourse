import axios from 'axios';
import { Diagnosis } from '../types';

import { apiBaseUrl } from '../constants';

export const getAllDiagnoses = async () => {
  return await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`).then(res => res.data);
};