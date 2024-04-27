import React from 'react'

const Page = ({params}:{params:{productPath:string}}) => {
  return (
    <div>This is product page pf category {params.productPath}
      <h1>Product Id {params.productPath}</h1>
    </div>
  )
}

export default Page