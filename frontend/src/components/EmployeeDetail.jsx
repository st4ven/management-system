import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEmployee } from '../EmployeeService';

const EmployeeDetail = ({ removeEmployee }) => {

    const [employee, setEmployee] = useState({
        id: '',
        name: '',
        email: '',
        phone_number: '',
        address: '',
        job_title: '',
        account_status: ''
    });

    const { id } = useParams();

    const fetchEmployee = async (id) => {
        try {
            const { data } = await getEmployee(id);
            setEmployee(data);
        } catch (error) {

        }
    }

    const onChange = (event) => {
        setEmployee({ ...employee, [event.target.name]: event.target.value });
    }

    const onRemoveEmployee = async (id) => {
        await removeEmployee(id);
    }
    useEffect(() => {
        fetchEmployee(id);
    }, []);

    return (
        <>
            <Link to={'/employees'} className='link'><i className='bi bi-arrow-left'></i>Back to list</Link>

            <div className="whole">
                <div className="profile">
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

                <div className='profile__settings'>
                    <div>
                        <form className="form">
                            <div className="user-details">
                                <input type="hidden" defaultValue={employee.id} name="id" required />
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input type="text" value={employee.name} onChange={onChange} name="name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input type="text" value={employee.email} onChange={onChange} name="email" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone</span>
                                    <input type="text" value={employee.phone_number} onChange={onChange} name="phone_number" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Address</span>
                                    <input type="text" value={employee.address} onChange={onChange} name="address" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Title</span>
                                    <input type="text" value={employee.job_title} onChange={onChange} name="job_title" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Status</span>
                                    <input type="text" value={employee.account_status} onChange={onChange} name="account_status" required />
                                </div>
                            </div>
                            <div className="form_footer">
                                <button type='button' onClick={() => onRemoveEmployee(id)} className="btn btn-danger">Delete</button>
                                <button type="submit" className="btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeDetail;