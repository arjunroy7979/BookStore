import './App.css'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { Routes, Route } from 'react-router-dom'
import Admin from './components/pages/Admin'
import User from './components/pages/User'
import ProductMangaement from './components/pages/ProductMangaement'
import AdminProductDetails from './components/pages/AdminProductDetails'
import AdminDetails from './components/pages/AdminDetails'
import UpdateProduct from './components/pages/UpdateProduct'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/pages/Cart'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/private' element={<ProtectedRoute />} ></Route>
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/update-product' element={<UpdateProduct />} />
        <Route path='/admin/login-details' element={<AdminDetails />} />
        <Route path='/admin/product-listing' element={<ProductMangaement />} />
        <Route path='/admin/product-details' element={<AdminProductDetails />} />
        <Route path='/user' element={<User />} />
        <Route path='/user/cart' element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
