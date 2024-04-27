// import Image from 'next/image'
import Link from 'next/link'
import Image from 'next/image'
import FacebookLogo from'../../public/images/facebookLogo.svg'
import TwitterLogo from '@/public/images/twitterLogo.svg'
import LinkedInLogo from '@/public/images/linkedInLogo.svg'
import MainLogo from '../../public/images/main-logo.svg'
const Footer = () => {
  return (
    <>
    <footer>
        <div className="flex flex-row  mt-[20px]">

            <div className='flex flex-col  w-[100vw] max-w-full min-w-full '>
                <div className="flex flex-row flex-wrap p-[20px] h-[30vh]">
                    <div className="flex flex-col w-1/2 md:w-[49%] md:min-w-[45%] jusitfy-center my-auto ">
                        <Link href={'/'}>
                            <div className="flex flex-row">
                                <Image src={MainLogo} alt="mainfooterLogo" />
                            </div>
                        </Link>
                        <div className="flex flex-row text-[9.43px] leading-[14px] font-normal  text-[#505050] w-[80%] h-auto m-2 ml-0 md:text-base">Best information about the company goes here but now lorem ipsum is</div>
                        <div className="flex flex-row w-full h-[12.67%] min-h-[12.67%] max-h-[12.67%]">
                        
                            <Link href='#'>
                                <div className="flex flex-col ml-[4px]  w-full">
                                    <Image src={FacebookLogo} alt="facebook-link" />
                                </div>
                            </Link>
                            <Link href='#'>
                                <div className="flex flex-col ml-[4px]  h-full w-auto ">
                                    <Image src={TwitterLogo} alt="twitter-link" />
                                </div>
                            </Link>
                            <Link href='#'>
                                <div className="flex flex-col ml-[4px]  w-full">
                                    <Image src={LinkedInLogo} alt="linkedin-link" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 justify-center md:w-[51%] justify-items-center my-auto">
                        <div className="flex flex-row w-full">
                            <div className="flex flex-col w-1/2 justify-center md:text-base md:w-1/4">
                                

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[13px] text-[#1C1C1C] h-[2/7] mb-1 ">About 1 </div>
                                
                                <Link href='#'>

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">About Us</div>
                                </Link>
                                <Link href='#'>

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">Find Store</div>
                                </Link>
                                <Link href='#'>

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">Categories</div>
                                </Link>
                                <Link href='#'>

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">Blog</div>
                                </Link>
                            </div>
                            <div className="hidden md:flex flex-col w-1/2 justify-center md:text-base md:w-1/4">
                                

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[13px] text-[#1C1C1C] h-[2/7] mb-1 ">About 2 </div>
                                
                                <Link href='#'>

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">About Us</div>
                                </Link>
                                <Link href='#'>

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">Find Store</div>
                                </Link>
                                <Link href='#'>

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">Categories</div>
                                </Link>
                                <Link href='#'>

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">Blog</div>
                                </Link>
                            </div>
                            <div className="hidden md:flex flex-col w-1/2 justify-center md:text-base md:w-1/4">
                                

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[13px] text-[#1C1C1C] h-[2/7] mb-1 ">About 3</div>
                                
                                <Link href='#'>

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">About Us</div>
                                </Link>
                                <Link href='#'>

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">Find Store</div>
                                </Link>
                                <Link href='#'>

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">Categories</div>
                                </Link>
                                <Link href='#'>

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">Blog</div>
                                </Link>
                            </div>
                            <div className="flex flex-col w-1/2 justify-center md:text-base md:w-1/4">
                                <div className="flex flex-row font-medium text-[9.43px] leading-[13px] text-[#1C1C1C] h-[2/7] mb-1 ">For users</div>
                                <Link href="#">

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">Login</div>
                                </Link>
                                <Link href="#">

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">Register</div>
                                </Link>
                                <Link href="#">

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">Settings</div>
                                </Link>
                                <Link href="#">

                                    <div className="flex flex-row font-medium text-[9.43px] leading-[14px] text-[#8B96A5] h-[1/7] my-[1px]">My Orders</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="flex flex-row justify-between h-[20%] min-h-[20%] bg-[#EFF2F4] border-[#DEE2E7] border-t-[0.59px] px-6 py-[14px] align-center">
                
                    <div className="flex flex-col text-[#606060] text-[9.43px] leading-[14px] font-normal">© 2023 Ecommerce.</div>
                    {/* <div className="flex flex-col text-[9.43px] leading-[14px] font-normal">english</div> */}

                </div>
            </div>
            
        </div>
    </footer>
    </>
  )
}

export default Footer