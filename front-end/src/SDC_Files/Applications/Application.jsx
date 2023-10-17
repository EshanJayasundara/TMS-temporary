import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
import {FiLogIn} from "react-icons/fi";
import logo from "./../../Components/Images/UOPlogo.png";

const Application = () => {
  const {course_id, applicant_id} = useParams();
  const [application, setApplication] = useState(null);
  const [deanAccept, setDeanAccept] = useState(false);
  const [hodAccept, setHodAccept] = useState(false);

  const navigate = new useNavigate();

  const getApplications = async () => {
    try {
      localStorage.setItem('cidAaid', JSON.stringify({course_id, applicant_id}));
      const response = await fetch(
        'http://localhost:8080/application/get/' + course_id + '/' + applicant_id, 
        { method: 'GET', redirect: 'follow', credentials: 'include' });
      if (response.redirected) {
        navigate('/sdc/login');
      }
      if (response.status === 403) {
        navigate('/sdc/unAuthorized');
      }
      else if (response.status === 404) {
        navigate('/sdc/pageNotFound');
      }
      if (response.ok) {
        const jsonData = await response.json();
        setApplication(jsonData);
        console.log(jsonData);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getApplications();
  }, [course_id, applicant_id]);

  // Title hover
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const linkClasses = `flex items-center justify-center text-2xl pl-10 font-semibold ${
    isHovered ? "underline" : ""
  }`;

  //Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    application.deanAccept = deanAccept;
    application.hodAccept = hodAccept;
    console.log(application);

    // console.log('Form data submitted:', formData);
    const response = await fetch('http://localhost:8080/application/put/' + application.id,
      { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(application) });
    console.log(response.data);
    if (response.status == 200) {
      alert('application submission successful !');
    } else {
      alert('application submission unsuccessful !');
    }

    let registerMsg = document.getElementById("registerMsg");

    if (hodAccept) {
      registerMsg.textContent = "HOD Authorized";
      registerMsg.className =
        "bg-emerald-100 w-1/2 text-lg text-gray-900 rounded-md py-1 px-2 ml-5 font-medium";
    } else {
      registerMsg.textContent = "Dean Authorized";
      registerMsg.className =
        "bg-emerald-100 w-1/2 text-lg text-gray-900 rounded-md py-1 px-2 ml-5 font-medium";
    }
    getApplications();
  };

  const convertUnixToDateTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const formattedDate = date.toLocaleString(); // You can customize the formatting as needed

    return formattedDate;
  };

  const handleDeanCheck = (e) => {
    // Update the variable when the checkbox is checked or unchecked
    setDeanAccept(e.target.checked);
  };

  const HandleHodCheck = (e) => {
    // Update the variable when the checkbox is checked or unchecked
    setHodAccept(e.target.checked);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <section className="text-gray-800">
        <div className="px-6 p-4 space-y-4 bg-white rounded-lg">
          <div className="flex items-center">
            <a
              href="https://sdc.pdn.ac.lk/index.html"
              className={linkClasses}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img src={logo} width={120} className="mr-5" />
            </a>
            <div className="pr-12">
              <p className="text-2xl font-bold">Staff Development Center</p>
              <div className="bg-transparent text-md text-gray-900 rounded-md py-1">
                Registrateration form for<br />
                <b>{(application && application.mdlCourse) ? application.mdlCourse.fullname : ''}</b> Course<br/>
                from {(application && application.mdlCourse) ? convertUnixToDateTime(application.mdlCourse.startdate).substring(0, 10) : ''} to {(application && application.mdlCourse) ? convertUnixToDateTime(application.mdlCourse.enddate).substring(0, 10):''}
              </div>
            </div>
          </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Designation and Name */}
            <div className="flex justify-center items-center">
            <table className="md:w-3/5 w-4/5 mt-2 text-md font-medium text-gray-900 ml-2">
              <tbody>
                <tr>
                  <td className="pl-5 border border-opacity-50">
                    <label>Designation</label>
                  </td>
                  <td className="border border-opacity-50 text-center">
                    <input
                      type="text"
                      className="bg-gray-200 text-gray-900 text-center sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 p-1"
                      readOnly
                      value={(application && application.sdcApplicant) ? application.sdcApplicant.designation : ''}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pl-5 border border-opacity-50">
                    <label>Applicant Name</label>
                  </td>
                  <td className="border border-opacity-50 text-center">
                    <input
                      type="text"
                      className="bg-gray-200 text-gray-900 text-center sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 p-1"
                      readOnly
                      value={(application && application.sdcApplicant) ? application.sdcApplicant.name : ''}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pl-5 border border-opacity-50">
                    <label>Email</label>
                  </td>
                  <td className="border border-opacity-50 text-center">
                    <input
                      type="email"
                      className="bg-gray-200 text-gray-900 text-center sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 p-1"
                      readOnly
                      value={(application && application.sdcApplicant) ? application.sdcApplicant.email : ''}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pl-5 border border-opacity-50">
                    <label>Telephone</label>
                  </td>
                  <td className="border border-opacity-50 text-center">
                    <input
                      type="email"
                      className="bg-gray-200 text-gray-900 text-center sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 p-1"
                      readOnly
                      value={(application && application.sdcApplicant) ? application.sdcApplicant.telephone : ''}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pl-5 border border-opacity-50">
                    <label>Faculty</label>
                  </td>
                  <td className="border border-opacity-50 text-center">
                    <input
                      type="email"
                      className="bg-gray-200 text-gray-900 text-center sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 p-1"
                      readOnly
                      value={(application && application.sdcApplicant) ? application.sdcApplicant.faculty.name : ''}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pl-5 border border-opacity-50">
                    <label>Department</label>
                  </td>
                  <td className="border border-opacity-50 text-center">
                    <input
                      type="email"
                      className="bg-gray-200 text-gray-900 text-center sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 p-1"
                      readOnly
                      value={(application && application.sdcApplicant) ? application.sdcApplicant.department.name : ''}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pl-5 border border-opacity-50">
                    <label>Dean Authorized</label>
                  </td>
                  <td className="border border-opacity-50 text-center">
                    <input
                      type="email"
                      className="bg-gray-200 text-gray-900 text-center sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 p-1"
                      readOnly
                      value={(application) ? application.deanAccept : ''}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pl-5 border border-opacity-50">
                    <label>HOD Authorized</label>
                  </td>
                  <td className="border border-opacity-50 text-center">
                    <input
                      type="email"
                      className="bg-gray-200 text-gray-900 text-center sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 p-1"
                      readOnly
                      value={(application) ? application.hodAccept : ''}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
            {/* Authorizations */}
            <div className="flex items-start ml-12">
              <input
                type="checkbox"
                className="w-6 h-6 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                checked={deanAccept}
                onChange={handleDeanCheck}
              />
              <label className="ml-3 text-md font-bold">
                Authorization by Faculty Dean
              </label>
            </div>

            <div className="flex items-start ml-12">
              <input
                type="checkbox"
                className="w-6 h-6 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                checked = {hodAccept}
                onChange={HandleHodCheck}
              />
              <label className="ml-3 text-md font-bold">
                Authorization by Department Head
              </label>
            </div>

            <button
              type="submit"
              className="ml-12 px-5 py-1 bg-amber-900 hover:bg-amber-600 text-white text-lg font-medium rounded-lg"
              onClick={handleSubmit}
            >
              Save
            </button>
            <span id="registerMsg"></span>
          </form>
        </div>
      </section>
      </div>
    </>
  );
};

export default Application;
