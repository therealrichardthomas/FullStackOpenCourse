import Header from './Header'
import Content from './Content'


const Course = ({courses}) => {
    return (
        <>
            {
                courses.map(course => (
                    
                    // generalize keys as much as possible
                    <div key={course.id}>
                        <Header heading={course.name}/>
                        <Content parts={course.parts} />
                    </div>
                ))
            }
        </>
    )
}

export default Course