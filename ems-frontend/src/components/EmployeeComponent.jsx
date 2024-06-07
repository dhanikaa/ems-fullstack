import React, { useEffect } from 'react'
import { useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const {empId} = useParams();

    const [errors, setErrors] = useState({
        firstName:'',
        lastName:'',
        email:''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if(empId){
            getEmployee(empId)
            .then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => console.error(error));
        }
    },[empId]);

    function handleFirstName(e){
        setFirstName(e.target.value);
    }

    function handleLastName(e){
        setLastName(e.target.value);
    }

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){
            const employee = {firstName, lastName, email}
            console.log(employee)

            if(empId){
                updateEmployee(empId, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            }else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        } else{
            errorsCopy.firstName = 'Last Name is Required!';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        } else{
            errorsCopy.lastName = 'Last Name is Required!';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        } else{
            errorsCopy.email = 'Email is Required!';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(empId){
            return <h2 className='text-center'>Update Employee</h2>
        } else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

  return (
    <div className='container font-link'>
        <br /> <br />
        <div className='row'>
            <div className='card mt-3 col-md-6 offset-md-3 offset-md-3'>
                <div className='card-body'>
                    {pageTitle()}
                    <form action="">

                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input 
                            type="text" 
                            placeholder='Enter Employee First Name' 
                            name='firstName' 
                            value={firstName}
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            onChange={handleFirstName}/>
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input 
                            type="text" 
                            placeholder='Enter Employee Last Name' 
                            name='lastName' 
                            value={lastName}
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            onChange={handleLastName}/>
                            {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email Address:</label>
                            <input 
                            type="text" 
                            placeholder='Enter Employee Email Address' 
                            name='email' 
                            value={email}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}                            
                            onChange={handleEmail}/>
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>

                        <button className='btn btn-success mt-3' onClick={saveOrUpdateEmployee}>Submit</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent