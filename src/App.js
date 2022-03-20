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
  AboutPage,
  SingleProductPage
} from './pages'

function App() {
  return <Router>
    <Navbar />
    <Sidebar />
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route path='/about'>
        <AboutPage />
      </Route>
      <Route path='/cart'>
        <CartPage />
      </Route>
      <Route path='/checkout'>
        <CheckoutPage />
      </Route>
      <Route exact path='/products'>
        <ProductsPage />
      </Route>
      <Route path='/products/:id' children={<SingleProductPage />} />
      <Route path='*'>
        <ErrorPage />
      </Route>
    </Switch>
    <Footer />
  </Router>
}

export default App
