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
    dispatch({ type: COUNT_CART_TOTALS })
    localStorage.setItem('cart', JSON.stringify(state.cart))
    return () => {
    };
  }, [state.cart]);

  const addToCart = (id, amount, color, product) => {
    dispatch({ type: ADD_TO_CART, payload: {id, amount, color, product}})
  }

  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id})
  }

  const toggleAmount = (id, value) => {
    dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {id, value}})
  }

  return (
    <CartContext.Provider value={{
      ...state, addToCart, removeItem, toggleAmount
    }}>
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
