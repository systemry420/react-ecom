import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  const { id } = useParams()
  const {
    singleProduct: product,
    singleProductLoading: loading,
    singleProductError: error,
    fetchSingleProduct
  } = useProductsContext()

  useEffect(() => {
    console.log(`${url}${id}`);
    fetchSingleProduct(`${url}${id}`)
    return () => {
    };
  }, []);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }
  
  const { 
    name, 
    price, 
    description, 
    stock, 
    stars, 
    reviews, 
    images, 
    company} = product;

  return <Wrapper>
    <PageHero title={name} />
    <div className='section section-center page'>
      <div className='product-center'>
        <ProductImages images={images} />
        <div className='content'>
          <h2>{name}</h2>
          <Stars />
          <h5>{formatPrice(price)}</h5>
          <p className='desc'>{description}</p>
          <p className='info'>
            <span>Available</span>
            {stock}
          </p>
          <p className='info'>
            <span>SKU</span>
            {id}
          </p>
          <p className='info'>
            <span>Company</span>
            {company}
          </p>
        </div>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
