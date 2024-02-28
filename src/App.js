import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import Register from './Components/Register/Register';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Orders from './Components/Orders/Orders';
import Address from './Components/Address/Address';
import NotFound from './Components/NotFound/NotFound';
import AuthContextProvider from './Components/Contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import AuthProtectedRoute from './Components/ProtectedRoute/AuthProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Contexts from './Components/Contexts/AuthContext';



function App() {

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '', element: <Navigate to={'home'} /> },
        { path: 'register', element: <AuthProtectedRoute>  <Register /> </AuthProtectedRoute> },
        { path: 'login', element: <AuthProtectedRoute>  <Login /> </AuthProtectedRoute> },


        { path: 'home', element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute>  <Products /> </ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
        { path: 'orders', element: <ProtectedRoute><Orders /> </ProtectedRoute> },
        { path: 'address/:cartId', element: <ProtectedRoute> <Address /> </ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
        { path: 'AuthContexts', element: <ProtectedRoute><Contexts /> </ProtectedRoute> },


        { path: '*', element: <NotFound /> },
      ]
    }
  ])


  return <>

    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>

  </>
}

export default App;
