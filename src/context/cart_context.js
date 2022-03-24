import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getLocalCart = () => {
  const cart = localStorage.getItem('cart')
  if(cart) {
    return JSON.parse(cart)
  }
  return []
}

const initialState = {
  cart: getLocalCart(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 0
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
    return () => {
    };
  }, [state.cart]);

  const addToCart = (id, amount, color, product) => {
    dispatch({ type: ADD_TO_CART, payload: {id, amount, color, product}})
  }

  const removeItem = (id) => {

  }

  return (
    <CartContext.Provider value={{
      ...state, addToCart
    }}>
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
