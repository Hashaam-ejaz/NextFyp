import React from 'react'

const Page = ({params}:{params:{categoryName: string}}) => {
    const parameter=decodeURI(params.categoryName);
  return (
    <>
    
        <div className='min-h-full flex-grow'><h1>This is {decodeURI(params.categoryName)} page</h1></div>
    
    </>
  )
}

export default Page