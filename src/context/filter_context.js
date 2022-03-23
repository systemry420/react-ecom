import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  allProducts: [],
  filteredProducts: [],
  gridView: false,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    color: 'all',
    category: 'all',
    minPrice: 0,
    maxPrice: 0,
    shipping: false
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { products } = useProductsContext()

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
    return () => {
    };
  }, [products]);

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS })
    return () => {
    };
  }, [products, state.sort]);

  const changeView = (view) => {
    if (view === 'grid')
      dispatch({ type: SET_GRIDVIEW })
    else
      dispatch({ type: SET_LISTVIEW })
  }

  const updateSort = (e) => {
    dispatch({type: UPDATE_SORT, payload: e.target.value});
  }

  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'category') {
      value = e.target.textContent
    }
    dispatch({ type: UPDATE_FILTERS, payload: {name, value}})
  }

  const clearFilters = () => {

  }

  return (
    <FilterContext.Provider value={{
      ...state,
      changeView,
      updateSort,
      updateFilters,
      clearFilters
    }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
