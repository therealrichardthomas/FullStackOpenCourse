import { NewDiaryEntry, Visibility, Weather } from "./types";
import { z } from 'zod';

export const NewEntrySchema = z.object({
  comment: z.string().optional(),
  date: z.iso.date(),
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
});

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return NewEntrySchema.parse(object);
};


// since we are using zod we don't need the following

// const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   if (!object || typeof object !== 'object') { 
//     throw new Error('Incorrect or missing data');
//   }

//   if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
//     const newEntry: NewDiaryEntry = {
//       comment: z.string().optional().parse(object.comment),
//       date: z.iso.date().parse(object.date),
//       weather: z.enum(Weather).parse(object.weather),
//       visibility: z.enum(Visibility).parse(object.visibility)
//     };
    
//     return newEntry;
//   }

//   throw new Error('Incorrect data: some fields are missing');

// };

// const parseComment = (comment: unknown): string => {
//   if (!isString(comment)) {
//     throw new Error('Incorrect or missing comment');
//   }

//   return comment;
// };

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const parseDate = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//     throw new Error('Incorrect or missing date: ' + date);
//   }
//   return date;
// };

// const parseWeather = (weather: unknown): Weather => {
//   if(!isString(weather) || !isWeather(weather)) {
//     throw new Error('Incorrect or missing weather: ' + weather);
//   }
//   return weather;
// };

// const isWeather = (param: string): param is Weather => {
//   return Object.values(Weather).map(v => v.toString()).includes(param);
// };

// const parseVisibility = (visibility: unknown): Visibility => {
//   if (!isString(visibility) || !isVisibility(visibility)) {
//     throw new Error('Incorrect or missing weather: ' + visibility);
//   }
//   return visibility;
// };

// const isVisibility = (param: string): param is Visibility => {
//   return Object.values(Visibility).map(v => v.toString()).includes(param);
// };

// export default toNewDiaryEntry;