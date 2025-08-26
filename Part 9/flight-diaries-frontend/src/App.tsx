import { useState, useEffect } from 'react';
import type { NonSensitiveDiaryEntry, NewDiaryEntry } from '../../flight-diaries/src/types';
import { getAllDiaries, addDiary } from './services/diaryService';

import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(()=> {
    getAllDiaries().then(data => setDiaries(data));
  }, [])

  const createDiary = (entry: NewDiaryEntry) => {
    addDiary(entry).then(data => setDiaries(diaries.concat(data)));
  }

  return (
    <div>
      <h2>Diary entries</h2>
      <DiaryForm createDiary={createDiary} />
      {diaries.map(diary => 
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <ul>
            <li>visibility: {diary.visibility}</li>
            <li>weather: {diary.weather}</li>
          </ul>
        </div>
      )}
    </div>
  );
}


export default App;