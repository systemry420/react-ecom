import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    filters: {
      text, company, category, color, price,
      minPrice, maxPrice, shipping
    },
    updateFilters, clearFilters, allProducts
  } = useFilterContext()

  const uniqueCompany = getUniqueValues(allProducts, 'company')
  const uniqueCategory = getUniqueValues(allProducts, 'category')
  const uniqueColor = getUniqueValues(allProducts, 'colors')

  return (
    <Wrapper>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <h5>Search</h5>
          <input
            type="text"
            name="text"
            value={text}
            className='search-input'
            placeholder='Search products'
            onChange={updateFilters}
          />
        </div>

        <div className='form-control'>
          <h5>Category</h5>
          <div>
            {uniqueCategory.map((c, i) => {
              return <button className={
                c === category? 'active': ''
              } name='category' onClick={updateFilters}>
                {c}
              </button>
            })}
          </div>
        </div>

        <div className='form-control'>
          <h5>Company</h5>
          <select name='company' value={company} onChange={updateFilters}>
            {uniqueCompany.map((c, i) => {
              return <option key={i} value={c}>{c}</option>
            })}
          </select>
        </div>

        <div className='form-control'>
          <h5>Color</h5>
          <div className='colors'>
            {uniqueColor.map((c, i) => {
              if (c === 'all') {
                return <button 
                onClick={updateFilters}
                data-color={'all'}
                className={`all-btn ${c === color? 'active':''}`}>All</button>
              }

              return <button
                key={i}
                style={{background: c}}
                onClick={updateFilters}
                data-color={c}
                name='color'
                className={`color-btn ${c === color? 'active':''}`}
              >
                {c === color && <FaCheck />}
              </button>
            })}
          </div>
        </div>

        <div className='form-control'>
          <h5>Price</h5>
          <p className='price'>{formatPrice(price)}</p>
          <input type='range' value={price} min={minPrice} max={maxPrice} name='price' onChange={updateFilters}/>
        </div>

        <div className='form-control'>
          <h5>Free Shipping</h5>
          <input type='checkbox' onChange={updateFilters} checked={shipping} name='shipping' />
        </div>
      </form>
      <button className='clear-btn' onClick={clearFilters}>Clear Filters</button>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
