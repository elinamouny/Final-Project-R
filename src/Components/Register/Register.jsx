import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Register() {

  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3, "Min length must be 3 chracters").max(20, "Max length must be 20 chracters"),
    email: Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter valid Email"),
    password: Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must contain special character, number more than 8 characters and less than 18 characters"),
    rePassword: Yup.string().required("RePassword is required").oneOf([Yup.ref('password')]),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, 'Enter valid Egyptian phone number'),
  })

  function validate(values) {
    const errors = {};

    if (values.name == "") {
      errors.name = 'Name is required'
    } else if (values.name.length < 3) {
      errors.name = "Min length must be 3 chracters"
    } else if (values.name.length > 20) {
      errors.name = "Max length must be 20 chracters"
    }

    if (values.email == "") {
      errors.email = 'Email is required'
    } else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(values.email)) {
      errors.email = "Enter valid Email"
    }

    if (values.password == "") {
      errors.password = 'Password is required'
    } else if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(values.password)) {
      errors.password = "Password must contain special character, number more than 8 characters and less than 18 characters"
    }

    if (values.rePassword == "") {
      errors.rePassword = 'RePassword is required'
    } else if (values.password != values.rePassword) {
      errors.rePassword = "Password and repassword doesn't match"
    }

    if (values.phone == "") {
      errors.phone = 'Phone is required'
    } else if (!(/^01[0125][0-9]{8}$/).test(values.phone)) {
      errors.phone = "Enter valid Egyptian phone number"
    }
    console.log(errors);
    return errors;
  }

  const { values, handleSubmit, handleChange, errors, touched, handleBlur, isValid } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit: async () => {
      setErrorMsg('');
      try {
        setIsLoading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
        if (data.message == "success") {
          navigate('/login')
        }
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
      setIsLoading(false)
    },
    validationSchema
  })


  return <>
    <div className="w-75 m-auto my-5">
      <h1>Register Now :</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className='my-1'>Name:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.name} type="text" className='form-control mb-3' id='name' name='name' />
        {errors.name && touched.name && <p className='alert alert-danger'>{errors.name}</p>}

        <label htmlFor="email" className='my-1'>Email:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" className='form-control mb-3' id='email' name='email' />
        {errors.email && touched.email && <p className='alert alert-danger'>{errors.email}</p>}

        <label htmlFor="password" className='my-1'>Password:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" className='form-control mb-3' id='password' name='password' />
        {errors.password && touched.password && <p className='alert alert-danger'>{errors.password}</p>}

        <label htmlFor="rePassword" className='my-1'>RePassword:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.rePassword} type="password" className='form-control mb-3' id='rePassword' name='rePassword' />
        {errors.rePassword && touched.rePassword && <p className='alert alert-danger'>{errors.rePassword}</p>}

        <label htmlFor="phone" className='my-1'>phone:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.phone} type="tel" className='form-control mb-3' id='phone' name='phone' />
        {errors.phone && touched.phone && <p className='alert alert-danger'>{errors.phone}</p>}

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        {isLoading ?
          <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block '> <i className='fas fa-spin fa-spinner px-3'></i> </button>
          :
          <button type='submit' disabled={!isValid || isLoading} className='btn bg-main px-3 text-white ms-auto d-block'>Register</button>
        }


      </form>
    </div>
  </>
}
