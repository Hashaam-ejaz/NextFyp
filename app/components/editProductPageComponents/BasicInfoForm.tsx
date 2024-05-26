import React, { useState, useEffect } from "react";
import { formData } from "./stepper";


interface BasicInfoFormProps {
  formData: formData;
  setFormData: (data: formData) => void;
  productID: string;
}

const categories = [
  {
      "_id": "1",
      "category": "Electronics",
      "subCategories": [
          { "name": "Computers & Tablets", "_id": "1" },
          { "name": "Cell Phones & Accessories", "_id": "2" },
          { "name": "TVs, Video & Audio", "_id": "3" },
          { "name": "Camera & Photo", "_id": "4" }
      ]
  },
  {
      "_id": "2",
      "category": "Home & Kitchen",
      "subCategories": [
          { "name": "Small Appliances", "_id": "1" },
          { "name": "Kitchen Appliances", "_id": "2" },
          { "name": "Furniture", "_id": "3" },
          { "name": "Bath", "_id": "4" }
      ]
  },
  {
      "_id": "3",
      "category": "Fashion",
      "subCategories": [
          { "name": "Men's Fashion", "_id": "1" },
          { "name": "Women's Fashion", "_id": "2" },
          { "name": "Kid's Fashion", "_id": "3" },
          { "name": "Shoes", "_id": "4" }
      ]
  },
  {
      "_id": "4",
      "category": "Beauty & Health",
      "subCategories": [
          { "name": "Makeup", "_id": "1" },
          { "name": "Skincare", "_id": "2" },
          { "name": "Fragrances", "_id": "3" },
          { "name": "Vitamins & Supplements", "_id": "4" }
      ]
  },
  {
      "_id": "5",
      "category": "Sports & Outdoors",
      "subCategories": [
          { "name": "Athletic Apparel", "_id": "1" },
          { "name": "Sporting Goods", "_id": "2" },
          { "name": "Outdoor Gear", "_id": "3" },
          { "name": "Fitness & Exercise", "_id": "4" }
      ]
  }
];

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ formData, setFormData,productID }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(formData.category);
  const [subCategories, setSubCategories] = useState<{ name: string; _id: string; }[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(formData.subCategory);
  // const [isChecked, setIsChecked] = useState(formData.featured);
  const [product,setProduct]=useState(null);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat.category === selectedCategory);
      setSubCategories(category ? category.subCategories : []);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (formData.subCategory) {
      setSelectedSubCategory(formData.subCategory);
    }
  }, [formData.subCategory]);
  //https://ecommerce-fyp.s3.amazonaws.com/Untitled+design.png
  //https://ecommerce-fyp.s3.amazonaws.com/jewellery-1203951_640.jpg
  //https://ecommerce-fyp.s3.amazonaws.com/pexels-dima-valkov-3266700.jpg
  // const handleSubmit = async (e: React.FormEvent) => {
  //   console.log("Uploading Images...");
  //   e.preventDefault();
  //   try {
  //     const formDataForUpload = new FormData();
  //     selectedFiles.forEach(file => formDataForUpload.append("files", file));

  //     const response = await fetch("http://localhost:3000/api/s3-upload", {
  //       method: "POST",
  //       body: formDataForUpload,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to upload images to S3");
  //     }

  //     const data: { fileNames: string[] } = await response.json();
  //     console.log("Images uploaded:", data.fileNames);
  //     // Update formData with data of all uploaded images
  //     const updatedFormData = {
  //       ...formData,
  //       productImages: data.fileNames.map(fileName => ({
  //         src: `https://ecommerce-fyp.s3.amazonaws.com/${fileName}`,
  //         alt: fileName.split(".")[0]
  //       }))
  //     };
    
  //   setFormData(updatedFormData);

  //   } catch (error) {
  //     console.error("Error uploading images:", error);
  //   }
  // };

  // const handleImageUpload = async (files: FileList | null, index: number) => {
  //   if (!files) return;
  //   const file = files[0];

  //   setSelectedFiles(prevFiles => {
  //     const updatedFiles = [...prevFiles];
  //     updatedFiles[index] = file;
  //     return updatedFiles;
  //   });
    
  // };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCat = event.target.value;
    setSelectedCategory(selectedCat);
    const category = categories.find(cat => cat.category === selectedCat);
    setSubCategories(category ? category.subCategories : []);
    setSelectedSubCategory(''); // Reset subcategory selection
    setFormData({ ...formData, category: selectedCat, subCategory: '' });
  };

  const handleSubCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubCat = event.target.value;
    setSelectedSubCategory(selectedSubCat);
    setFormData({ ...formData, subCategory: selectedSubCat });
  };

  // const handleCheckboxChange = (checked: boolean) => {
  //   setIsChecked(checked);
  //   setFormData({ ...formData, featured: checked });
  // };

  return (
    <form className="px-10">
      {/* <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Product Images
        </label>
        <div className="flex flex-wrap">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="w-1/4 mb-4 px-3">
              <ImageUpload
                onUpload={(files) => handleImageUpload(files, index)}
                index={index}
              />
            </div>
          ))}
        </div>
        <div className="flex mt-4 ml-12 justify-end">
              <button
                className=" mr-2 px-3 py-2 bg-[#806491] text-white rounded-md border border-gray-300"
              >
                Upload Images
              </button>
        </div>
      </div> */}
      {/* <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Lorem Ipsum Store"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name:e.target.value})}
        />
      </div> */}
      {/* <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Category <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="category"
          type="text"
          placeholder="Dairy Products"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
      </div> */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.category}>{cat.category}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subCategory">
          Sub Category <span className="text-red-500">*</span>
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subCategory"
          value={selectedSubCategory}
          onChange={handleSubCategoryChange}
          disabled={!selectedCategory}
        >
          <option value="" disabled>Select a sub category</option>
          {subCategories.map((subCat) => (
            <option key={subCat._id} value={subCat.name}>{subCat.name}</option>
          ))}
        </select>
      </div>

      {/* <div>
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        <div className="mt-4">
        </div>
      </div> */}

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="sku"
        >
          SKU
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="sku"
          type="text"
          placeholder="#SBC1234567"
          value={formData.sku}
          onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phonenumber"
        >
          Bar Code
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="barcode"
          type="text"
          placeholder="1234567890"
          value={formData.barcode}
          onChange={(e) =>
            setFormData({ ...formData, barcode: e.target.value })
          }
        />
      </div>
    </form>
  );
};

export default BasicInfoForm;
