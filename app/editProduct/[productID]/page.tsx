'use client';
import Stepper from '../../components/editProductPageComponents/stepper';
import React from 'react'

const Page = ({params}:
  {
    params : {productID: string}
  }
) => {
  return (
    <Stepper sellerProductID={params.productID} steps={3}/>
  )
}

export default Page