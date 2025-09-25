import React from 'react';
import blackTop1 from '../../../public/images/blacktop-img4.webp'
import blackTop2 from '../../../public/images/blacktop-img3.webp'
import blackTop3 from '../../../public/images/blacktop-img5.webp'
import './Reviews.css';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      image: blackTop1,
      rating: 5,
      headline: "Best coffee in town!",
      text: "😍💆🏽‍♂️the best coffee in safi ☕️ the best place music 🎵 people service im in love with this place 🫶🏽",
      name: "Zakaria Knouni"
    },
    {
      id: 2,
      image: blackTop2,
      rating: 5,
      headline: "Perfect spot for studying",
      text: "My go to in asfi best frappucino and cappucino in town",
      name: "Insaf"
    },
    {
      id: 3,
      image: blackTop3,
      rating: 5,
      headline: "Worth every penny",
      text: "Nothing to say: the quality is top, a warm and cozy place, I liked the service as well as the staff who are attentive, the service is fast....bravo👏👏👏",
      name: "AFOUFAR DRISS"
    },
  ];

  return (
    <section id="reviews" className="reviews-section">
      {/* Header */}
      <div className="reviews-header">
        <h1 className="reviews-title">What Are People Saying?</h1>
      </div>

      {/* Reviews Grid */}
      <div className="reviews-container">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            {/* Image */}
            <div className="review-image">
              <img src={review.image} alt={review.headline} />
            </div>

            {/* Star Rating */}
            <div className="review-rating">
              {'★'.repeat(review.rating)}
            </div>

            {/* Headline */}
            <h3 className="review-headline">"{review.headline}"</h3>

            {/* Review Text */}
            <p className="review-text">{review.text}</p>

            {/* Reviewer Name */}
            <div className="reviewer-name">{review.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;