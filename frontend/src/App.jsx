import { useEffect, useRef, useState } from 'react'
import './App.css'
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import { deleteEmployee, getEmployees, saveEmployee} from './EmployeeService';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import EmployeeDetail from './components/EmployeeDetail';

function App() {
  const [data, setData] = useState({});
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    job_title: '',
    account_status: ''
  });

  const modalRef = useRef();

  const getAllEmployees = async () => {
    try {
      const { data } = await getEmployees();
      setData(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleNewEmployee = async (event) => {
    event.preventDefault();

    try {
      const { data } = await saveEmployee(values);

      toggleModal(false);

      setValues({
        name: '',
        email: '',
        phone_number: '',
        address: '',
        job_title: '',
        account_status: ''
      });

      getAllEmployees();
    } catch (error) {
      console.error(error.message);
    }
  };

  const navigate = useNavigate();

  const removeEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      navigate('/employees');
      getAllEmployees();
    } catch (error) {
      console.error(error.message);
    }
  }
  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <>
      <Header toggleModal={toggleModal} numEmployees={data.length} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/employees"} />} />
            <Route path="/employees" element={<EmployeeList data={data} />} />
            <Route path="/employees/:id" element={<EmployeeDetail removeEmployee={removeEmployee}/>} />
          </Routes>
        </div>
      </main>

      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Employee</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="modal__body">
          <form onSubmit={handleNewEmployee}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" value={values.email} onChange={onChange} name='email' required />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input type="text" value={values.job_title} onChange={onChange} name='job_title' required />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" value={values.phone_number} onChange={onChange} name='phone_number' required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" value={values.address} onChange={onChange} name='address' required />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input type="text" value={values.account_status} onChange={onChange} name='account_status' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default App;
