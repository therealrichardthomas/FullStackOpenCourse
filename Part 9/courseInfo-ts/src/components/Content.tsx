
interface CourseParts {
  name: string;
  exerciseCount: number;
}

interface CoursePartsProps {
  courseParts: CourseParts[]
}

const Content = ({ courseParts }: CoursePartsProps) => {
  return (
    <>
      <p>{courseParts[0].name} {courseParts[0].exerciseCount}</p>
      <p>{courseParts[1].name} {courseParts[1].exerciseCount}</p>
      <p>{courseParts[2].name} {courseParts[2].exerciseCount}</p>
    </>
  );
};


export default Content;