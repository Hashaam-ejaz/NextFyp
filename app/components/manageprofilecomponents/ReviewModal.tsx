import React, { useState, useEffect, use } from 'react';
import { OrderProduct } from './OrderHistory'; // Import OrderProduct interface
import { Types } from 'mongoose';

interface Review {
  rating: number;
  date: string;
  userID: Types.ObjectId | null;
  reviewDescription: string;
  images: {
    src: string;
    alt: string;
  }[];
}

interface ReviewPageProps {
  product: OrderProduct;
  onSubmit: (review: Review) => void;
  onClose: () => void;
  userID: Types.ObjectId | null;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ product, onSubmit, onClose, userID }) => {
  const [rating, setRating] = useState<number>(0);
  const [reviewDescription, setReviewDescription] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting review...');
    try {
      const response1 = await fetch(`http://localhost:3000/api/products/${product.id}`);
      if (!response1.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response1.json();
      const currentProduct = data.existingProduct;
      const newNoReviews = currentProduct.noReviews ? currentProduct.noReviews + 1 : 1;
       // Construct the new review object
       const newReview: Review = {
        rating: rating,
        date: new Date().toISOString(),
        userID: userID,
        reviewDescription: reviewDescription,
        images: [],
      };
      // Send review to server by appending the reviews array and other data
      const response = await fetch(`http://localhost:3000/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviews: [...currentProduct.reviews, newReview],
          noReviews: newNoReviews,
          avgRating: calculateAvgRating([...currentProduct.reviews, newReview]),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      console.log('Review submitted successfully');
      onSubmit(newReview);
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
      // Function to calculate average rating
      const calculateAvgRating = (reviews: Review[]) => {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviews.length;
      };


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          &#10006;
        </button>
        <h2 className="text-2xl font-bold mb-4">Leave a Review for {product.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <StarRating value={rating} onChange={setRating} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reviewText">
              Review:
            </label>
            <textarea
              id="reviewText"
              placeholder='Write a review...'
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#806491] hover:bg-white hover:border hover:border-gray-500 text-white hover:text-[#806491] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  const rating = [1, 2, 3, 4, 5];

  return (
    <div className="flex">
      {rating.map((star) => (
        <button
          key={star}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onChange(star);
          }}
          className={`text-3xl focus:outline-none ${
            star <= value ? 'text-yellow-500' : 'text-gray-400'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default ReviewPage;
