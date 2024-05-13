"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import BasicInfoForm from './BasicInfoForm';
import AddressInfoForm from './AddressInfoForm';
import BankInfoForm from './BankInfoForm';

interface StepperProps {
  steps: number;
}


const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const { data: session, status } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const stepperRef = useRef({}); // Ref to store formData

  const handleNext = (data: object) => {
    setFormData({ ...formData, ...data });
    stepperRef.current = { ...formData, ...data };
    if (currentStep < steps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  useEffect(() => {
    console.log('formData:', formData);
  },[formData]);

  const handleSubmit = async () => {
    console.log('Form Data:', formData);
    console.log('Stepper Data:', stepperRef.current);
    const finalData = { ...formData, ...stepperRef.current }; // Merge data

    console.log('Final Data:', finalData);
    if (!session || !session.user) return;
    try {
      const userResponse = await fetch(`http://localhost:3000/api/users?email=${session.user.email}`);
      const userData = await userResponse.json();
      const user = userData.existingUser;
      console.log('UserID:', user._id);
      console.log('FormData:', formData);
      const updatedUserData = {

      }
      // const response = await fetch(`http://localhost:3000/api/users/${user._id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to submit user data');
      // }
      // console.log('User data submitted successfully');
      // console.log('Response:', response);
    } catch (error) {
      console.error('Error submitting user data:', error);
    }
  };

  const stepNames = ['Basic Information', 'Address Information', 'Bank Information'];

  const renderFormForStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoForm onNext={handleNext} />;
      case 2:
        return <AddressInfoForm onNext={handleNext} />;
      case 3:
        return <BankInfoForm formData={formData} onNext={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <div className="lg:w-full lg:max-w-4xl md:max-w-md sm:max-w-md flex justify-center items-start">
      <ul className="relative flex flex-col sm:flex-row gap-x-2 mt-8 sm:my-4 md:gap-x-2 lg:w-full">

          {Array.from({ length: steps }, (_, index) => (
            <li
              key={index}
              className={`flex items-center gap-x-2 shrink basis-0 flex-1 group ' ${
                index + 1 === currentStep ? 'active' : ''
              }`}

            >
              <div className="flex items-center">
              {index !== 0 && (
                  <div className="hidden sm:flex items-center justify-center mx-2"> {/* Hide for small screens */}
                    <svg
                      className="w-4 h-4 text-gray-600 mx-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
                <span
                  className={`min-w-7 min-h-7 group inline-flex items-center text-xs align-middle focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${
                    index + 1 === currentStep ? 'hs-stepper-active' : ''
                  }`}
                >
                  <span
                    className={`size-7 flex justify-center items-center flex-shrink-0 font-medium text-white rounded-full group-focus:bg-gray-200 ${
                      index + 1 === currentStep
                        ? 'bg-[#806491]'
                        : index + 1 < currentStep
                        ? 'bg-[#037400]'
                        : 'bg-[#E1E1E6]'
                    }`}
                  >
                    {index + 1 < currentStep && index + 1 !== steps ? (
                      <svg
                        className="flex-shrink-0 size-3"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </span>

                  <span className="ms-2 text-sm font-medium text-[#8D8D99] group-focus:text-gray-500">
                    {stepNames[index]}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full max-w-4xl bg-white border border-black p-6 mt-5">
        {renderFormForStep()}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="py-2 px-3 mr-5 w-[5.688rem] inline-flex justify-center items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </button>
          {currentStep === steps ? (
            <button
              type="button"
              className="py-2 px-3 w-[5.688rem] justify-center inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-[#806491] text-white hover:bg-purple-400 hover:text-[#806491]"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              className="py-2 px-3 w-[5.688rem] justify-center inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-[#806491] text-white hover:bg-purple-400 hover:text-[#806491] disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => handleNext({})}
              disabled={currentStep === steps}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
