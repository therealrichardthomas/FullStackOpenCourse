import { useState } from 'react';
import type{ NewDiaryEntry } from '../../../flight-diaries/src/types';
import { Visibility, Weather } from '../../../flight-diaries/src/types';


interface CreateDiaryProps {
  createDiary: (entry: NewDiaryEntry) => void;
}

const DiaryForm = ({ createDiary }: CreateDiaryProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility | undefined >(undefined);
  const [weather, setWeather] = useState<Weather | undefined>(undefined);
  const [comment, setComment] = useState('');

  const newDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!date || !visibility || !weather) {
      alert('please fill in required fields');
      return;
    }

    const diaryEntry: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    }

    createDiary(diaryEntry);

    setDate('');
    setVisibility(undefined);
    setWeather(undefined);
    setComment('');
  }


  return (
    <div>
      <form onSubmit={newDiary}>
        <div>
          date<input type='date' value={date} onChange={({target}) => setDate(target.value)} />
        </div>
        <div>
          visibility:&nbsp;&nbsp;&nbsp;&nbsp;
                    great<input type="radio" name="visibility" onChange={() => setVisibility(Visibility.Great)} checked={visibility === Visibility.Great} /> &nbsp;
                    good<input type="radio" name="visibility" onChange={() => setVisibility(Visibility.Good)} checked={visibility === Visibility.Good} /> &nbsp;
                    ok<input type="radio" name="visibility" onChange={() => setVisibility(Visibility.Ok)} checked={visibility === Visibility.Ok} /> &nbsp;
                    poor<input type="radio" name="visibility" onChange={() => setVisibility(Visibility.Poor)} checked={visibility === Visibility.Poor} />
        </div>
        <div>
          weather:&nbsp;&nbsp;&nbsp;&nbsp;
                  sunny<input type="radio" name="weather" onChange={() => setWeather(Weather.Sunny)} checked={weather === Weather.Sunny} /> &nbsp;
                  rainy<input type="radio" name="weather" onChange={() => setWeather(Weather.Rainy)} checked={weather === Weather.Rainy} /> &nbsp;
                  cloudy<input type="radio" name="weather" onChange={() => setWeather(Weather.Cloudy)} checked={weather === Weather.Cloudy} /> &nbsp;
                  stormy<input type="radio" name="weather" onChange={() => setWeather(Weather.Stormy)} checked={weather === Weather.Stormy} /> &nbsp;
                  windy<input type="radio" name="weather" onChange={() => setWeather(Weather.Windy)} checked={weather === Weather.Windy} /> &nbsp;
        </div>
        <div>
          comment<input value={comment} onChange={({target}) => setComment(target.value)} />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default DiaryForm;