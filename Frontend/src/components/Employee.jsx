import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProfileImage } from '../api/EmployeeService'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// Card component
const Employee = ({ employee }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getProfileImage(employee.id);
        setImageUrl(url);
      } catch (error) {
        console.error("Failed to fetch image", error);
      }
    };

    fetchImage();
  }, [employee.id]);

  return (
    <Link to={`/employees/${employee.id}`} className="employee__item">
            <div className="employee__header">
                <div className="employee__image">
                    <LazyLoadImage src={imageUrl} alt={employee.name} />
                </div>
                <div className="employee__details">
                    <p className="employee_name">{employee.name} </p>
                    <p className="employee_title">{employee.title}</p>
                </div>
            </div>
            <div className="employee__body">
                <p><i className="bi bi-envelope"></i> {employee.email} </p>
                <p><i className="bi bi-geo"></i> {employee.address}</p>
                <p><i className="bi bi-telephone"></i> {employee.phone}</p>
                <p>{employee.status === 'Active' ? <i className='bi bi-check-circle'></i> : 
                    <i className='bi bi-x-circle'></i>} {employee.status}</p>
            </div>
        </Link>
  )
}

export default Employee