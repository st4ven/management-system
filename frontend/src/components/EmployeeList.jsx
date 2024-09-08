import React from 'react';
import Employee from './Employee';

const EmployeeList = ({data}) => {
  return (
    <main className="main">
        {data?.length === 0 && <div>No employees. Please add a new employee.</div>}

        <ul className="employee_list">
            {data?.length > 0 && data.map(employee => <Employee employee={employee} key={employee.id}/>)}
        </ul>
    </main>
  )
}

export default EmployeeList;