import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../../../flight-diaries/src/types';


const baseUrl = 'http://localhost:3000/api/diaries';


export const getAllDiaries = () => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then(res => res.data);
}

export const addDiary = (object: NewDiaryEntry) => {
  return axios.post<DiaryEntry>(baseUrl, object).then(res => res.data);
}