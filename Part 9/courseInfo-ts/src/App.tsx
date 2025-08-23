import Content from "./components/Content";
import Header from "./components/header";
import Total from './components/Total';

import { courseParts } from "./types";

const App = () => {
  const courseName = "Half Stack Application Development";
  
  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );

};


export default App;