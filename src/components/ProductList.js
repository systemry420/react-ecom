import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filteredProducts, gridView } = useFilterContext()


  if (filteredProducts.length < 1) {
    return <h2>Sorry, no match ..</h2>
  }

  if (!gridView) {
    return <ListView filteredProducts={filteredProducts} />
  }
  
  return <GridView filteredProducts={filteredProducts} />
}

export default ProductList
