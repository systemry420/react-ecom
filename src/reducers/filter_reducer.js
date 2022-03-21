import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        filteredProducts: action.payload
      }

    case SET_GRIDVIEW:
      return {
        ...state,
        gridView: true
      }
  
    case SET_LISTVIEW:
      return {...state, gridView: false}

    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload
      }

    case SORT_PRODUCTS:
      const { sort, filteredProducts } = state
      let temp = [...filteredProducts]
      if (sort === 'price-lowest') {
        temp = temp.sort((a, b) => {
          return a.price - b.price
        })
      } else if(sort === 'price-highest') {
        temp = temp.sort((a, b) => {
          return b.price - a.price
        })
      } else if (sort === 'name-a') {
        temp = temp.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      } else {
        temp = temp.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      return {...state, filteredProducts: temp }

    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default filter_reducer
