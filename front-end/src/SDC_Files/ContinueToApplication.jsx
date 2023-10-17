import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContinueToApplication = () => {
  
  const navigate = new useNavigate();

  const arr = JSON.parse(localStorage.getItem('cidAaid'));

  console.log(arr.course_id, arr.applicant_id);
  useEffect(() => {
    navigate('/sdc/application/' + arr.course_id + '/' + arr.applicant_id);
  }, []);
  
  return (
    <div>Please wait - Continue to Application...</div>
  )
}

export default ContinueToApplication