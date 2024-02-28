import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

function Address() {

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 let { cartId } = useParams();

  

  const validationSchema = Yup.object({
    details: Yup.string().required('Details is required'),
    city: Yup.string().required('City is required'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, "Enter valid Egyptian phone")
  });

  const { values, handleSubmit, handleChange, errors, touched, handleBlur, isValid } = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: '',
    },
    onSubmit: async () => {
      setErrorMsg('');
      setIsLoading(true); 

      try {
       let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
        shippingAddress:values
       },
       {headers: {
        token: localStorage.getItem('token'),
      },
      params: {
        url: 'http://localhost:3000',
      }
      

       })
       window.open(data.session.url, '_self');

      } catch (error) {
        setErrorMsg(error.response?.data?.message || 'An error occurred');
      }

      setIsLoading(false);
    },
    validationSchema
  });

  return (
    <div className="w-75 m-auto my-5">
      <h1>Address:</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="details" className='my-1'>Details:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.details} type="text" className='form-control mb-3' id='details' name='details' />
        {errors.details && touched.details && <p className='alert alert-danger'>{errors.details}</p>}

        <label htmlFor="city" className='my-1'>City:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.city} type="text" className='form-control mb-3' id='city' name='city' />
        {errors.city && touched.city && <p className='alert alert-danger'>{errors.city}</p>}

        <label htmlFor="phone" className='my-1'>Phone:</label>
        <input onChange={handleChange} onBlur={handleBlur} value={values.phone} type="text" className='form-control mb-3' id='phone' name='phone' />
        {errors.phone && touched.phone && <p className='alert alert-danger'>{errors.phone}</p>}

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        {isLoading ?
          <button disabled type='button' className='btn bg-main px-4 text-white ms-auto d-block '> <i className='fas fa-spin fa-spinner px-3'></i> </button>
          :
          <button type='submit' disabled={!isValid || isLoading} className='btn bg-main px-3 text-white ms-auto d-block'>Checkout</button>
        }
      </form>
    </div>
  );
}

export default Address;
