import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SDCNavbar from '../SDCNavbar';

function FacultySave() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    deanname: ''
  });
  const [deanData, setDeanData] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSubmitStatus(null);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data submitted:', formData);
      const response = await fetch('http://localhost:8080/faculty/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus('success');
        fetchDeanList();
        setFormData({
          name: '',
          email: '',
          deanname: ''
        });
      } else {
        setSubmitStatus('failure');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitStatus('failure');
    }
  };

  const handleUpdate = async() => {
    fetchDeanList();
    
  }

  // fetch faculty details
  const fetchDeanList = async () => {
    try {
      const responseDean = await fetch('http://localhost:8080/faculty/get', { method: 'GET', redirect: 'follow', credentials: 'include' });
      if (responseDean.redirected) {
        navigate('/sdc/login');
      }
      if (responseDean.ok) {
        const jsonDataDean = await responseDean.json();
        setDeanData(jsonDataDean);
        //console.log("Dean Data:", jsonDataDean)
      } else {
        console.error('Failed to fetch data');
      }
      if (responseDean.redirected) {
        navigate('/sdc/login');
      }
      if (responseDean.status === 403) {
        navigate('/sdc/unAuthorized');
      }
      else if (responseDean.status === 404) {
        navigate('/sdc/pageNotFound');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClick = (n, e, d) => {
    setFormData({
      name: n,
      email: e,
      deanname: d
    });
    setShow(true);
  }

  const handleDelete = async (id) => {
    try {
      const responseDean = await fetch('http://localhost:8080/faculty/delete/' + id, { method: 'DELETE', redirect: 'follow', credentials: 'include' });
      if (responseDean.redirected) {
        navigate('/sdc/login');
      }
      if (responseDean.ok) {
        console.log('data deleted');
        fetchDeanList();
      } else {
        console.error('Failed to delete data');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      deanname: ''
    });
    setShow(false);
  }

  useEffect(() => {
    fetchDeanList();
  }, []);

  return (
    <>
      <SDCNavbar />
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        <div className='ml-12'>
          <div className="container mx-auto p-4">
            <h1 className="text-xl text-black font-bold mx-auto mt-4 mb-3 text-center bg-amber-200 pt-2 pb-3 py-2 rounded-lg">
              Add New Faculty
            </h1>
          </div>
          <div className="container mx-auto p-4 ml-8">
            <form onSubmit={(!show) ? handleSubmit : handleUpdate} className="max-w-md">
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder='Enter the name of the faculty'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-1 border rounded pl-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Enter the email address of the dean of the faculty'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-1 border rounded pl-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="deanname" className="block font-medium">Dean Name:</label>
                <input
                  type="text"
                  id="deanname"
                  name="deanname"
                  placeholder='Enter the name of the dean of the faculty'
                  value={formData.deanname}
                  onChange={handleChange}
                  required
                  className="w-full p-1 border rounded pl-2"
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
            </form>
          </div>
        </div>
        <div className='mr-12'>
          <h1 className="mt-8 text-xl text-black font-bold mx-auto mb-3 text-center bg-amber-200 pt-2 pb-3 py-2 rounded-lg">
            Faculties
          </h1>
          {deanData.map((faculty) => (
              <div className='w-full pl-5 p-1 m-1 bg-gray-800 text-blue-300 font-medium rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-300 hover:text-gray-800' key={faculty.id}>
                <table className='w-full'>
                  <tr>
                  <td>{faculty.name}</td>
                  <td className='flex justify-end items-end mr-1'>
                      <button
                      className="ml-2 text-white bg-blue-700 hover:bg-blue-900 py-1 px-1 pt-0 pb-0 rounded"
                        onClick={() => handleClick(faculty.name, faculty.email, faculty.deanname)}
                      >
                        Edit
                      </button>
                      <button
                        className="ml-2 text-white bg-red-700 hover:bg-red-900 py-1 px-1 pt-0 pb-0 rounded"
                        onClick={() => handleDelete(faculty.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FacultySave;
