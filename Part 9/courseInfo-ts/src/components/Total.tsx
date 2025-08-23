
interface CourseParts {
  name: string;
  exerciseCount: number;
}

interface CoursePartsProps {
  courseParts: CourseParts[];
}


const Total = ({ courseParts }: CoursePartsProps) => {
  const total = courseParts.reduce((sum, part) => {
    return sum + part.exerciseCount;
  }, 0);

  return (
    <p>number of exercises {total}</p>
  );
};


export default Total;