import React from 'react'
import { useStateValue } from '../StateProvider'

const Checkout = () => {
    const [{basket}] = useStateValue();
    console.log('checkout >>>', basket);
  return (
    <div>
      CheckOut
      <p>{basket.length}</p>
    </div>
  )
}

export default Checkout
