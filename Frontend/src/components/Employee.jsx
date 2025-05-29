import React from 'react'
import { Link } from 'react-router-dom'

// Card component
const Employee = ({ employee }) => {
  return (
    <Link to={`/employees/${employee.id}`} className="employee__item">
            <div className="employee__header">
                <div className="employee__image">
                    <img src={employee.photoUrl} alt={employee.name}  />
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