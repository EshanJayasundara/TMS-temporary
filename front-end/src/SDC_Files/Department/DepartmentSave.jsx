import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SDCNavbar from '../SDCNavbar';

function DepartmentSave() {
  const [show, setShow] = useState(false);
  const [deanData, setDeanData] = useState([]);
  const [hodData, setHodData] = useState([]);
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
      if (response.ok) {
        setSubmitStatus('success');
        fetchDepList(formData.faculty.id);
        setFormData({
          name: '',
          email: '',
          hodName: '',
          faculty: {
            id: ''
          }
        });
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

  // fetch faculty details
  const fetchDepList = async (id) => {
    try {
      const responseHod = await fetch('http://localhost:8080/department/get/' + id, {
        method: 'GET',
        redirect: 'follow',
        credentials: 'include',
      });
      if (responseHod.redirected) {
        navigate('/sdc/login');
      }
      if (responseHod.status === 403) {
        navigate('/sdc/unAuthorized');
      } else if (responseHod.status === 404) {
        navigate('/sdc/pageNotFound');
      }
      if (responseHod.ok) {
        const jsonDataHod = await responseHod.json();
        setHodData(jsonDataHod);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFacultyChange = async (e) => {
    setSelectedFaculty(e.target.value);
    fetchDepList(e.target.value);
    formData.faculty.id = e.target.value;
  };

  const handleClick = (n, e, d) => {
    setFormData({
      name: n,
      email: e,
      hodName: d
    });
    setShow(true);
  }

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      hodName: ''
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
      <div className="mx-auto p-2 pb-6 pl-4 text-gray-800 bg-slate-100 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2">
      <div className="">
        <label htmlFor="faculty" className="block font-medium">Select the faculty:</label>
        <select
          className="block w-full mt-1 text-gray-800 font-medium p-1 border rounded-lg focus:ring focus:ring-blue-500"
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
      </div>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        <div>
          <h1 className="mt-6 text-xl text-black font-bold mx-auto mb-3 text-center bg-amber-200 pt-2 pb-3 py-2 rounded-lg">
            Add New Department
          </h1>
            <form onSubmit={(!show) ? handleSubmit : handleUpdate} className="max-w-md">
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
        <div>
          <h1 className="mt-6 text-xl text-black font-bold mx-auto mb-3 text-center bg-amber-200 pt-2 pb-3 py-2 rounded-lg">
            Faculties
          </h1>
          {hodData.map((department) => (
            <div className='w-full pl-5 p-1 m-1 bg-gray-800 text-blue-300 font-medium rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-300 hover:text-gray-800' key={department.id}>
              <table className='w-full'>
                <tr>
                  <td>{department.name}</td>
                  <td className='flex justify-end items-end mr-1'>
                    <button
                      className="ml-2 text-white bg-blue-700 hover:bg-blue-900 py-1 px-1 pt-0 pb-0 rounded"
                      onClick={() => handleClick(department.name, department.email, department.hodName)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default DepartmentSave;
