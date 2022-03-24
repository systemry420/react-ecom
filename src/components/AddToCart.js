import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
  const { id, stock, colors } = product;
  const { addToCart } = useCartContext()
  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((old) => {
      let temp = old + 1;
      if (temp > stock)
        temp = stock
      return temp
    })
  }
  
  const decrease = () => {
    setAmount(old => {
      let temp = old - 1;
      if (temp < 2) 
        temp = 1
      return temp
    })    
  }

  return <Wrapper>
    <div className='colors'>
      <span>Colors:</span>
      <div>
      {colors.map((color, idx) => {
        return <button 
          key={idx}
          style={{background: color}}
          onClick={() => setMainColor(color)}
          className={`color-btn ${mainColor === color ? 'active' : ''}`}
        >
          {mainColor === color ? <FaCheck /> : null}
        </button>
      })}
      </div>
      <div className='btn-container'>
        <AmountButtons amount={amount} increase={increase} decrease={decrease} />
        <Link to='/cart' onClick={() => addToCart(id, amount, mainColor, product)}>Go to cart</Link>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
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
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
