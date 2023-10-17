import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SDCNavbar from '../SDCNavbar';
import { useNavigate } from 'react-router-dom';

function ApplicantSave() {

  const [show, setShow] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setselectedDepartment] = useState("");
  const [deanData, setDeanData] = useState([]);
  const [hodData, setHodData] = useState([]);
  const [lecturerData, setLecturerData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    telephone: "",
    faculty: {
      id: 0
    },
    department: {
      id: 0
    }
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const navigate = new useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFacultyChange = async (e) => {
    setSelectedFaculty(e.target.value);
    formData.faculty.id = e.target.value;
    try {
      const responseHod = await fetch('http://localhost:8080/department/get/' + e.target.value, { method: 'GET', redirect: 'follow', credentials: 'include' });
      if (responseHod.redirected) {
        navigate('/sdc/login');
      }
      if (responseHod.status === 403) {
        navigate('/sdc/unAuthorized');
      }
      else if (responseHod.status === 404) {
        navigate('/sdc/pageNotFound');
      }
      if (responseHod.ok) {
        const jsonDataHod = await responseHod.json();
        setHodData(jsonDataHod);
        //console.log("Dean Data:", jsonDataDean)
      } else {
        console.error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchLecturers = async (fac, dep) => {
    const responseLec = await fetch('http://localhost:8080/applicant/get_by_fac_dep/' + fac + '/' + dep, { method: 'GET', redirect: 'follow', credentials: 'include' });
    try {
      if (responseLec.redirected) {
        navigate('/sdc/login');
      }
      if (responseLec.status === 403) {
        navigate('/sdc/unAuthorized');
      }
      else if (responseLec.status === 404) {
        console.log(selectedDepartment)
        navigate('/sdc/pageNotFound');
      }
      if (responseLec.ok) {
        setLecturerData([]);
        const jsonDataLec = await responseLec.json();
        setLecturerData(jsonDataLec);
        //console.log("Dean Data:", jsonDataDean)
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleDepartmentChange = async (e) => {
    setselectedDepartment(e.target.value);
    formData.department.id = e.target.value;
    fetchLecturers(selectedFaculty, e.target.value);
    
  };

  // console.log(selectedFaculty); // for debugging
  console.log(selectedDepartment); // for debugging

  // fetch faculty details
  const fetchFacList = async () => {
    try {
      const responseDean = await fetch('http://localhost:8080/faculty/get', { method: 'GET', redirect: 'follow', credentials: 'include' });
      if (responseDean.redirected) {
        navigate('/sdc/login');
      }
      if (responseDean.status === 403) {
        navigate('/sdc/unAuthorized');
      }
      else if (responseDean.status === 404) {
        navigate('/sdc/pageNotFound');
      }
      if (responseDean.ok) {
        const jsonDataDean = await responseDean.json();
        setDeanData(jsonDataDean);
        //console.log("Dean Data:", jsonDataDean)
      } else {
        console.error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(selectedFaculty !== "" && selectedDepartment !== ""){
      console.log('Form data submitted:', formData);
      try {
        const response = await fetch('http://localhost:8080/applicant/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData),
        });
        setFormData({
          name: "",
          email: "",
          designation: "",
          telephone: "",
          faculty: {
            id: 0
          },
          department: {
            id: 0
          }
        });
        if (response.ok) {
          setSubmitStatus('success');
          fetchLecturers(selectedFaculty, selectedDepartment);
        } else {
          setSubmitStatus('failure');
        }
      } catch (error) {
        console.error('Submission failed:', error);
        setSubmitStatus('failure');
      }
    } else {
      alert("please select a faculty and a department");
    }
  };

  const handleClick = (n, e, d, t) => {
    setShow(true);
    setFormData({
      name: n,
      email: e,
      designation: d,
      telephone: t,
      faculty: {
        id: 0
      },
      department: {
        id: 0
      }
    });
  }

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      designation: "",
      telephone: "",
      faculty: {
        id: 0
      },
      department: {
        id: 0
      }
    });
    setShow(false);
  }

  useEffect(() => {
    fetchFacList();
  }, []);

  const handleUpdate = async () => {

  }

  return (
    <>
      <SDCNavbar />
      <div className="container mx-auto p-4">
        <div className="mx-auto p-2 text-gray-800 bg-slate-100 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2">
          <div className="mb-4 ml-2 mr-2">
            <label className="text-gray-800 font-medium">
              Select the faculty:
            </label>
            <select
              className="block w-full mt-1 text-gray-800 font-medium p-1 border rounded-lg focus:ring focus:ring-blue-500"
              value={selectedFaculty}
              onChange={handleFacultyChange}
              required
            >
              <option value="" disabled defaultValue className='font-medium'>
                Select the faculty
              </option>
              {deanData.map((faculty) => (
                <option key={faculty.id} value={faculty.id} className='font-medium'>
                  {faculty.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 ml-2 mr-2">
            <label className="text-gray-800 font-medium">
              Select the Department:
            </label>
            <select
              className="block w-full mt-1 text-gray-800 font-medium p-1 border rounded-lg focus:ring focus:ring-blue-500"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              required
            >
              <option value="" disabled defaultValue className='font-medium'>
                Select the department
              </option>
              {hodData ? (
                hodData.map((department) => (
                  <option key={department.id} value={department.id} className='font-medium'>
                    {department.name}
                  </option>
                ))
              ) : (
                <option value="" className='font-medium'>
                  No departments available
                </option>
              )}
            </select>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
          <div>
            <h1 className="text-xl font-bold mt-5 marker:mx-auto mb-3 text-center bg-amber-200 pt-2 pb-3 py-2 rounded-lg">Add New Lecturer</h1>
            <form onSubmit={(!show) ? handleSubmit : handleUpdate}>
                <div className='w-2/3'>
                  <div className="mb-2">
                    <label htmlFor="name" className="block text-black font-medium p-1">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 text-gray-800 font-medium py-1 border rounded-md"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="email" className="block text-black font-medium p-1">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    className="w-full px-4 text-gray-800 font-medium py-1 border rounded-md"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="designation" className="block text-black font-medium p-1">Designation:</label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                    className="w-full px-4 text-gray-800 font-medium py-1 border rounded-md"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="telephone" className="block text-black font-medium p-1">Telephone:</label>
                    <input
                      type="text"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                    className="w-full px-4 text-gray-800 font-medium py-1 border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-400 ease-in-out hover:bg-blue-800">
                      {show ? 'Update' : 'Submit'}
                    </button>
                    <button
                      type="button"
                      className="ml-3 bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-400 ease-in-out hover:bg-red-800"
                      onClick={handleClear}
                    >
                      clear
                    </button>
                    {submitStatus === 'success' && (
                      <span className="bg-green-700 text-white px-4 py-2 rounded-full ml-2">&#10003; Successful</span>
                    )}
                    {submitStatus === 'failure' && (
                      <span className="bg-red-700 text-white px-4 py-2 rounded-full ml-2">&#10005; Error</span>
                    )}
                  </div>
                </div>
              </form>
          </div>
          <div className="row m-4">
            <h2 className='text-xl font-bold mt-1 marker:mx-auto mb-3 text-center bg-amber-200 pt-2 pb-3 py-2 rounded-lg'>Already in the System</h2>
            <div className='grid mt-4 grid-cols-1 sm:grid-cols-2'>
              {lecturerData.map((lecturer) => (
                <>
                <div className='p-1 m-1 bg-gray-800 text-blue-300 font-medium rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-300 hover:text-gray-800' key={lecturer.id}>
                    <table className='w-full'>
                      <tr>
                        <td>({lecturer.id}) {lecturer.name}</td>
                        <td className='flex justify-end items-end mr-1'>
                          <button
                            className="ml-2 text-white bg-blue-700 hover:bg-blue-900 py-1 px-1 pt-0 pb-0 rounded"
                            onClick={() => handleClick(lecturer.name, lecturer.email, lecturer.designation, lecturer.telephone)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicantSave;