import { useEffect, useRef, useState } from 'react'
import './App.css'
import { deleteEmployee, getEmployees, saveEmployee, uploadProfileImage } from './api/EmployeeService';
import Header from './components/Header';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';
import { toastError, toastSuccess } from './api/ToastService';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    status: '',
  })

  const modalRef = useRef();
  const fileRef = useRef();

  // gets all the employees for the page
  const getAllEmployees = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getEmployees(page, size);
      
      setData(data);
    } catch (error) {
      console.error(error.message);
      toastError(error.message);
    }
  }

  // on change event for modal
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  // on submit: create new employee in the database and display it
  const handleNewEmployee = async (event) => {
    event.preventDefault();

    try {
      // save the employee
      const { data } = await saveEmployee(values);
      const formData = new FormData();

      formData.append('file', file, file.name);

      const { data: photoUrl } = await uploadProfileImage(data.id, formData);

      // close the modal
      toggleModal(false);

      // reset the file and file ref
      setFile(undefined);
      fileRef.current.value = null;

      // reset the values
      setValues({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
      })

      toastSuccess("Employee added!");

      // refresh the employees
      getAllEmployees();
    } catch (error) { 
      console.log(error);
      toastError(error.message);
    }
  }

  const navigate = useNavigate();

  const updateEmployee = async (employee) => {
    try {
      await saveEmployee(employee);
      getAllEmployees();
    } catch (error) {
      console.error(error.message);
    }
  }

   const removeEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      navigate('/employees');
      toastSuccess("Employee deleted!");
      getAllEmployees();
    } catch (error) {
      console.error(error.message);
      toastError(error.message);
    }
  }

  const updateImage = async (id, formData) => {
    try {
      const { data: photoUrl } = await uploadProfileImage(id, formData);
    } catch (error) {
      console.log(error);
    }
  };

  // toggle the modal
  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <>
      <Header toggleModal={toggleModal} numEmployees={data.totalElements} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/employees"} />} />
            <Route path="/employees" element={<EmployeeList data={data} currentPage={currentPage} getAllEmployees={getAllEmployees} />} />
            <Route path="/employees/:id" element={<EmployeeDetail updateEmployee={updateEmployee} updateImage={updateImage} removeEmployee={removeEmployee}/>} />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Employee</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
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
                <input type="text" value={values.title} onChange={onChange} name='title' required />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" value={values.phone} onChange={onChange} name='phone' required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" value={values.address} onChange={onChange} name='address' required />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input type="text" value={values.status} onChange={onChange} name='status' required />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>

      <ToastContainer />
    </>
  )
}

export default App
