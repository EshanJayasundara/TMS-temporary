import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SDCNavbar from '../SDCNavbar';

function FacultySave() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    deanname: ''
  });

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
      await fetch('http://localhost:8080/faculty/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        deanname: ''
      });
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitStatus('failure');
    }
  };

  return (
    <>
      <SDCNavbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-gray-800 font-bold mx-auto mb-3 text-center bg-amber-100 pt-2 pb-3 py-2 rounded-lg">
          Add New Faculty
        </h1>
      </div>
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="max-w-md">
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
              Submit
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
    </>
  );
}

export default FacultySave;
