import React, {useEffect, useState} from 'react'
import { listEmployees, deleteEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmplyees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmplyees(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(empId){
        navigator(`/edit-employee/${empId}`)
    }

    function removeEmployee(empId){ 
        console.log(empId);
        deleteEmployee(empId).then((response) => {
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container font-link'>
        <h2 className='text-center mt-3'>List of Employees</h2>
        <button className="btn btn-primary mb-3" onClick={addNewEmployee}>
            Add Employee
        </button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.empId}>
                            <td>{employee.empId}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className="btn btn-secondary" onClick={() => updateEmployee(employee.empId)}>Update</button>
                                <button className="btn btn-danger" onClick={() => removeEmployee(employee.empId)} style={{marginLeft: '10px'}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent