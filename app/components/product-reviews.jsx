import { useState } from "react";

export function ProductReviews({ product }) {
  const [displayRating, setDisplayRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [toggleImageVisibility, setToggleImageVisibility] = useState(false);

  return (
    <>
      {product.reviews.map((item, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row justify-between my-4"
        >
          {/* Review card */}
          <div className="w-[323.42px] h-[386.88px] bg-[#F9FAFB] p-4 flex flex-col justify-center items-center sm:mx-auto">
            <div className="mb-4 text-center">
              <p className="text-5xl font-bold text-[#954BAF]">{item.rating}</p>
              <div className="my-2 text-2xl">
                {" "}
                <StarRating rating={item.rating} />{" "}
              </div>
              <p className="text-[#4F547B]">Product Rating</p>
            </div>
            <div className="mt-8 w-[20.214rem] flex flex-col items-center">
              <div className="flex items-center mb-6">
                <div className="h-1 bg-[#D1D5DB] w-[12.867rem] relative">
                  <div className="h-1 bg-[#20590C] w-[10.2rem]"></div>
                </div>
                <span className="ml-4 text-sm text-[#954BAF]">80%</span>
              </div>
              <div className="flex items-center mb-6">
                <div className="h-1 bg-[#D1D5DB] w-[12.867rem] relative">
                  <div className="h-1 bg-[#20590C] w-[8.7rem]"></div>
                </div>
                <span className="ml-4 text-sm text-[#954BAF]">65%</span>
              </div>
              <div className="flex items-center mb-6">
                <div className="h-1 bg-[#D1D5DB] w-[12.867rem] relative">
                  <div className="h-1 bg-[#20590C] w-[5.5rem]"></div>
                </div>
                <span className="ml-4 text-sm text-[#954BAF]">45%</span>
              </div>
              <div className="flex items-center">
                <div className="h-1 bg-[#D1D5DB] w-[12.867rem] relative">
                  <div className="h-1 bg-[#20590C] w-[1.95rem]"></div>
                </div>
                <span className="ml-4 text-sm text-[#954BAF]">15%</span>
              </div>
            </div>
          </div>
          {/* Text div */}

          <div className="hidden md:block lg:block w-[799.8px] bg-white p-4">
            <div className="mb-4">
              <p className="text-lg font-semibold">{item.userID}</p>
              <StarRating rating={item.rating} />
            </div>
            <p className="mb-2 "> {item.reviewHeading}</p>
            <p className="text-sm text-gray-500">{item.reviewDescription}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export function StarRating({ rating }) {
  const stars = [];

  // Fill stars array with filled or empty stars based on rating
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <span key={i} className="text-[#E59819]">
          &#9733;
        </span>
      ); // Filled star
    } else {
      stars.push(
        <span key={i} className="text-[#77878F]">
          &#9734;
        </span>
      ); // Empty star
    }
  }
  return <div>{stars}</div>;
}
