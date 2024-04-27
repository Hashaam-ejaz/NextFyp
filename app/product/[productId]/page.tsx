import React from 'react'

const Page = ({params}:{params:{productId:string}}) => {
  return (
    <div>This is product page
      <h1>Product Id {params.productId}</h1>
    </div>
  )
}

export default Page