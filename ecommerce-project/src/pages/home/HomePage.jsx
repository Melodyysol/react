import axios from 'axios'
import { useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import ProductsGrid from './ProductsGrid'


import './HomePage.css'


function HomePage({ cart, loadCart }) {

  const [products, setProducts] = useState([])

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search')

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search ? `https://react-backend-eb45.onrender.com/api/products?search=${search}` : 'https://react-backend-eb45.onrender.com/api/products'
      const response = await axios.get(urlPath)
      setProducts(response.data)
    }
    getHomeData()
  }, [search])

  return (
    <>
      <title>Ecomerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />


      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  )
}

export default HomePage
