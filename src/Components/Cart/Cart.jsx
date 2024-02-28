import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import { Link } from 'react-router-dom';

export default function Cart() {

  const [cart, setCart] = useState({})
  const [timeOutId, setTimeOutId] = useState()
  const[cartId,setCartId]=useState()

  async function getLoggedInCartProducts() {
    try {
      const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart', {
        headers: {
          token: localStorage.getItem('token')
        }
      })

      console.log(data);
      setCartId(data.data._id)
      setCart(data)
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromCart(productId) {
    const { data } = await axios.delete('https://route-ecommerce.onrender.com/api/v1/cart/' + productId, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(data);
    setCart(data);
  }
  async function clearCart() {
    const { data } = await axios.delete('https://route-ecommerce.onrender.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(data);
    setCart(data);
  }

  useEffect(() => {
    getLoggedInCartProducts()
  }, [])

  function updateCartProductCount(productId, count) {
    clearTimeout(timeOutId)

    setTimeOutId(setTimeout(async () => {
      if (count == 0) {
        removeProductFromCart(productId)
      } else {
        const { data } = await axios.put('https://route-ecommerce.onrender.com/api/v1/cart/' + productId, {
          count
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        console.log(data);
        setCart(data);
      }
    }, 500))
  }

  return <>

    {cart.data?.products.length > 0 ?
      <div className='my-5'>
        <button onClick={clearCart} className='btn btn-outline-danger d-block ms-auto'>Clear Cart</button>

        {cart.data?.products.map((cartProduct, index) => {
          return <CartProduct updateCartProductCount={updateCartProductCount} removeProductFromCart={removeProductFromCart} key={index} cartProduct={cartProduct} />
        })}

        <div className='d-flex justify-content-between'>
          <Link to={'/address/'+cartId} className='btn bg-main text-white'>CheckOut</Link>
          <p>Total cart Price: {cart.data?.totalCartPrice} EGP</p>
        </div>

      </div>
      :
      <h2 className='alert alert-warning text-center my-5'>No products in your cart</h2>
    }



  </>
}
