import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import { getEmployees } from './EmployeeService';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [data, setData] = useState({});

  const getAllEmployees = async () => {
    try {
      const { data } = await getEmployees();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  const toggleModal = (show) => { console.log("I was clicked") };

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
          </Routes>
        </div>
      </main>
    </>
  )
}

export default App;
