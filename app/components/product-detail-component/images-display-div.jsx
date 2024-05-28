// export function ImagesDisplayDiv(product)
import Image from "next/image";
import { useEffect, useState } from "react";
export function ImagesDisplayDiv({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); //not using because it has different states for different buttons
  useEffect(() => {
    setSelectedImage(product.images[currentImageIndex]);
  }, [product, currentImageIndex]);

  const scrollRightImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % product.images.length);
    setSelectedImage(product.images[currentImageIndex]);
  };
  const scrollLeftImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + product.images.length) % product.images.length
    );
  };
  const enlargeImage = () => {
    return (
      <>
        <div className="bg-black h-100vh w-vw">
          <Image
            className="h-100vh w-auto"
            alt={selectedImage.alt}
            src={selectedImage.src}
            width={50}
            height={50}
          />
        </div>
      </>
    );
  };

  return (
    <>
    
      <div className="flex  flex-row no-wrap  bg-white w-full">
        <div className="basis-1/5 px-4 bg-white  flex flex-col no-wrap">
          {product.images.map((item, index) => (
            <div key={index} className=" bg-white min-h-1/4 mb-12 shrink ">
              {" "}
              <Image
                alt={item.alt}
                src={item.src}
                width={50}
                height={50}
                className="w-full h-auto max-w-full max-h-full focus:ring-2 focus:ring-purple-900 "
                onClick={() => {
                  setSelectedImage(item);
                }}
              />
            </div>
          ))}
        </div>

        <div className="basis-4/5 bg-white relative items-center overflow-hidden">
          <Image
            className="w-auto h-full max-w-full max-h-full transition-transform object-contain"
            alt={selectedImage.alt}
            src={selectedImage.src}
            fill={true}
          />
          <button
            className="absolute top-2/4 left-0 translate-y-2/4 bg-gray-400 opacity-50 size-1/12"
            onClick={scrollLeftImage}
          >
            l
          </button>
          <button
            className="absolute top-2/4 right-0 translate-y-2/4 bg-gray-400 opacity-50 size-1/12"
            onClick={scrollRightImage}
          >
            l
          </button>
        </div>
      </div>
    </>
  );
}
