import type { CoursePart } from "../types";
import Part from "./Part";

interface CoursePartsProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: CoursePartsProps) => {
  return (
    <>
      {courseParts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
};


export default Content;