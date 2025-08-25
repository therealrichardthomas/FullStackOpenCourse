import axios from 'axios';
import type { Note, NewNote } from '../types';


const baseUrl = 'http://localhost:3001/notes';

export const getAllNotes = () => {
  return axios.get<Note[]>(baseUrl).then(res => res.data);
}

export const createNote = (object: NewNote) => {
  return axios.post<Note>(baseUrl, object).then(res => res.data);
}