import { useState, useEffect } from 'react';
import diaryService from '../../flight-diaries/src/services/diaryService';
import type { NonSensitiveDiaryEntry } from '../../flight-diaries/src/types';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(()=> {
    setDiaries(diaryService.getNonSensitiveEntries());
  }, [])

  return (
    <div>
      <h2>Diary entries</h2>
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