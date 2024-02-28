import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';

export default function Home() {

  const [products, setProducts] = useState([])

  async function getAllProducts() {
    const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/products')
    setProducts(data.data);
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return <>
    <CategoriesSlider />
    <div className="row">
      {products.map((product) => {
        return <div key={product.id} className="col-md-3">
          <Product product={product} />
        </div>
      })}
    </div>
  </>
}
