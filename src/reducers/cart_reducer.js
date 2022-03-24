import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, amount, color, product } = action.payload
      const temp = state.cart.find(i => i.id === (id + color))
      if (temp) {
        const tempCart = state.cart.map(item => {
          if (item.id === id + color) {
            let newAmount = item.amount + amount

            if (newAmount > item.max) {
              newAmount = item.max
            }
            return {...item, amount: newAmount}
          }
          return item
        })
        console.log(state);
        return {...state, cart: tempCart}
      } else {
        const newItem = {
          id: id + color,
          amount,
          color,
          price: product.price,
          name: product.name,
          image: product.images[0].url,
          max: product.stock
        }
        console.log(state);
        return {...state, cart: [...state.cart, newItem]}
      }

    case REMOVE_CART_ITEM:
      const tempCart = state.cart.filter(i => i.id !== action.payload)
      return {...state, cart: tempCart}

    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default cart_reducer
