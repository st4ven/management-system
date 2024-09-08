import React from 'react';
import { Link } from 'react-router-dom';

const Employee = ({employee}) => {
  return (
    <Link to={`/employees/${employee.id}`}>
      <div className="employees">
        <div className="employee_details">
          <p className="employee_name">{employee.name}</p>
          <p className="employee_title">{employee.job_title}</p>
        </div>

        <div className="employee_body">
          <p><i className="bi bi-envelope"></i>  {employee.email}</p>
          <p><i className="bi bi-geo"></i>  {employee.address}</p>
          <p><i className="bi bi-telephone"></i>  {employee.phone_number}</p>
          <p>{employee.account_status === 'Active' ? <i className='bi bi-check-circle'></i> : 
                    <i className='bi bi-x-circle'></i>}  {employee.account_status}</p>
        </div>
      </div>
    </Link>
  )
}

export default Employee;