import type { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = ({part}: PartProps) => {
  switch(part.kind) {
    case 'basic':
      return (
        <div>
          <p>{part.name}</p>
          <ul>
            <li>Exercise Count: {part.exerciseCount}</li>
            <li>Description: {part.description}</li>
          </ul>
        </div>
      )
    case 'group':
      return (
        <div>
          <p>{part.name}</p>
          <ul>
            <li>Exercise Count: {part.exerciseCount}</li>
            <li>Group Project Count: {part.groupProjectCount}</li>
          </ul>
        </div>
      )
    case 'background':
      return (
        <div>
          <p>{part.name}</p>
          <ul>
            <li>Exercise Count: {part.exerciseCount}</li>
            <li>Description: {part.description}</li>
            <li>Background: {part.backgroundMaterial}</li>
          </ul>
        </div>
      )
    case 'special':
      return (
        <div>
          <p>{part.name}</p>
          <ul>
            <li>Exercise Count: {part.exerciseCount}</li>
            <li>Description: {part.description}</li>
            <li>Required skills: {part.requirements.join(', ')}</li>
          </ul>
        </div>
      )
  }
}


export default Part;