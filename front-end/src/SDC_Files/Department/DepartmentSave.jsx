import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SDCNavbar from '../SDCNavbar';

function DepartmentSave() {
  const [deanData, setDeanData] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hodName: '',
    faculty: {
      id: ''
    }
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
    console.log('Form data submitted:', formData);

    try {
      const response = await fetch('http://localhost:8080/department/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      setFormData({
        name: '',
        email: '',
        hodName: '',
        faculty: {
          id: ''
        }
      });
      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('failure');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitStatus('failure');
    }
  };

  // fetch faculty details
  const fetchFacList = async () => {
    try {
      const responseDean = await fetch('http://localhost:8080/faculty/get', {
        method: 'GET',
        redirect: 'follow',
        credentials: 'include',
      });
      if (responseDean.redirected) {
        navigate('/sdc/login');
      }
      if (responseDean.status === 403) {
        navigate('/sdc/unAuthorized');
      } else if (responseDean.status === 404) {
        navigate('/sdc/pageNotFound');
      }
      if (responseDean.ok) {
        const jsonDataDean = await responseDean.json();
        setDeanData(jsonDataDean);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFacultyChange = async (e) => {
    setSelectedFaculty(e.target.value);
    formData.faculty.id = e.target.value;
  };

  useEffect(() => {
    fetchFacList();
  }, []);

  return (
    <>
      <SDCNavbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-gray-800 font-bold mx-auto mb-3 text-center bg-amber-100 pt-2 pb-3 py-2 rounded-lg">
          Add New Department
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
              placeholder='Enter the name of the department'
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
              placeholder='Enter the email of the head of the department'
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-1 border rounded pl-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hodName" className="block font-medium">HOD Name:</label>
            <input
              type="text"
              id="hodName"
              name="hodName"
              placeholder='Enter the name of the head of the department'
              value={formData.hodName}
              onChange={handleChange}
              required
              className="w-full p-1 border rounded pl-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="faculty" className="block font-medium">Select the faculty:</label>
            <select
              className="block w-full mt-1 p-1 border rounded-lg focus:ring focus:ring-blue-500"
              value={selectedFaculty}
              onChange={handleFacultyChange}
              required
            >
              <option value="" disabled defaultValue>
                Select the faculty
              </option>
              {deanData.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-400 ease-in-out hover:bg-blue-800">
              Submit
            </button>
            {submitStatus === 'success' && (
              <span className="bg-green-600 text-white px-4 py-2 rounded-full ml-2">&#10003; Successful</span>
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

export default DepartmentSave;
