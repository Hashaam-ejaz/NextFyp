import Image from 'next/image'
import Link from 'next/link'

const CategoryDiv = () => {
  const categories=['Home & Kitchen','Electronics'
  ,'Sports, Toys & Luggage','Men\'s Fashion','Kitchen & Outdoors'] 
  // ,'Women\'s Fashion','Home Improvement','Beauty,'All Categories' 
  return (
    <>
    <div id='categoryDiv' className=" flex-row hidden md:flex w-[90%] max-w-[90%] min-w-[90%] mx-auto mb-[20px] overflow-x-scroll scroll whitespace-nowrap scroll-smooth snap-mandatory snap-x ">
      <div className="mx-4 snap-start inline-block  cursor-pointer">
              
              <button className="rounded-[22px] py-1 px-2 bg-[#806491] text-white">
                  All Categories
              </button>
      </div>
    {
                categories.map((item,index)=>(
                    // <div key={index} className="flex flex-col mx-4 wrap">
                    <div key={index} className="mx-4 snap-start inline-block  cursor-pointer">
                      <Link href={`/categories/${item}`}>
                      
                        <div className=" rounded-[20px] py-1 px-2 bg-slate-200 ">
                            {item}
                        </div>
                        
                      </Link>
                    </div>
                )

                )
            }
    </div>

    </>
  )
}

export default CategoryDiv