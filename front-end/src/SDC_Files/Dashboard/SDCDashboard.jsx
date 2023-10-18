// imports
import { useState } from "react";
import SDCNavbar from "../SDCNavbar";
import { Step } from "../Templates/Step";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// main function
const SDCDashboard = () => {

  // useStates
  // Arrays
  const [coureses, setCourses] = useState([]);
  // Navigation
  const navigate = new useNavigate();

  // functions

  // fetch new courses
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8080/course/get', { method: 'GET', redirect: 'follow', credentials: 'include' });
      if (response.redirected) {
        navigate('/sdc/login');
      }
      console.log(response.status);
      if (response.status === 403) {
        navigate('/sdc/unAuthorized');
      }
      else if (response.status === 404) {
        navigate('/sdc/pageNotFound');
      }
      if (response.ok) {
        const jsonData = await response.json();
        const courseNames = jsonData.map((item) => item.fullname);
        setCourses(courseNames);
        console.log("CourseData:", courseNames)
      } else {
        console.error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // html, css, js all together -> typeScript
  return (
    <>
      <SDCNavbar />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-3">
        <div>
          <div className="font-bold text-center pt-2 pb-3 py-2 text-xl text-gray-900 ml-12 mt-5 bg-amber-200 p-1 rounded-lg mr-12">
            Steps to Follow
          </div>
          <Step />
          </div>
        
        <div className="text-center">
          {/* <div className="inline-block mt-8">
            <img
              src={Logo}
              width="100"
              className="inline-block transform -translate-y-2"
              alt="Logo"
            />
          </div> */}
          <div className="font-bold text-xl text-gray-900 mt-5 bg-amber-200 p-1 pt-2 pb-3 py-2 rounded-lg mr-12 mb-3">List of Upcomming Courses</div>
          {coureses.map((courese) => (
            <div key={courese} className="p-1 m-1 hover:bg-gray-800 hover:text-amber-200 font-medium text-center rounded-lg bg-slate-300 text-gray-800 mr-12">{courese}</div>
          ))}
        </div>
      </div>
      <div className="pb-20 p-5 select-none">
        {/* content goes inside this div */}
      </div>
    </>
  );
}

export default SDCDashboard;
