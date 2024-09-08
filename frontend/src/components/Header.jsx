import React from 'react'

const Header = ({toggleModal, numEmployees}) => {
  return (
    <div className="header">
        <div className="container">
            <h3>All Employees ({numEmployees})</h3>
            <button onClick={() => toggleModal(true)} className="btn">
              <i className='bi bi-plus-square'></i> Add New
            </button>
        </div>
    </div>
  )
}

export default Header