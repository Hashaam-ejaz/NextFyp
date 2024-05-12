import React from 'react';
import Stepper from '../components/selleraccountcomponents/stepper';
import logo from '../../public/logo.svg'

const Page: React.FC = () => {
  return (

<div className=''>
  <div className='mb-0'>
    <img
     src={logo.src} 
     width={194} 
     height={65} 
     alt="Logo" 
     />

     </div>

    <div className="container mx-auto mb-0">
      <Stepper steps={3} />
    </div>
</div>
  );
};

export default Page;
