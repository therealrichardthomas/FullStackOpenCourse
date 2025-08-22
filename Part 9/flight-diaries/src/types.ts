import { z } from 'zod';
import { NewEntrySchema } from './utils';

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

// takes all the fields from NewDiaryEntry and adds an extra field (id) but this seems backwards so we are sticking with the original
// export interface DiaryEntry extends NewDiaryEntry {
//   id: number
// }