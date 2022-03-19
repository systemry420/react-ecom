import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import {
  HomePage,
  CartPage,
  CheckoutPage,
  ErrorPage,
  PrivateRoute,
  ProductsPage,
  SingleProductPage
} from './pages'

function App() {
  return <Router>
    <Navbar />
    <Sidebar />
    <Switch>
      <Route exact path='/' element={<HomePage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/checkout' element={<CheckoutPage />} />
      <Route path='/products' element={<ProductsPage />} />
      <Route path='/products/:id' element={<SingleProductPage />} />
      <Route path='*' element={<ErrorPage />} />
    </Switch>
    <Footer />
  </Router>
}

export default App
