
import Navbar from "../../shared/Navbar";
import CoursePlayer from './CoursePlayer'

const Portal = () => {
  
  const storedData = JSON.parse(localStorage.getItem("auth"));
 
  const user = storedData.user;
   console.log('portal',user);
  return (
    <>
      <Navbar user={user} /> <CoursePlayer  />
    </>
  );
};

export default Portal;
