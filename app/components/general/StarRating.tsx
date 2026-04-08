import React from "react";
import { Star } from "lucide-react";

type SizeType = "sm" | "md" | "lg";

interface StarRatingProps {
  rating?: number;
  reviewCount?: number;
  size?: SizeType;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating = 4.3,
  reviewCount = 125,
  size = "md",
}) => {
  // Size configurations
  const sizeConfig = {
    sm: { star: 16, text: "text-sm", gap: "gap-1" },
    md: { star: 20, text: "text-base", gap: "gap-2" },
    lg: { star: 24, text: "text-lg", gap: "gap-2" },
  };

  const config = sizeConfig[size] || sizeConfig.md;

  // Render stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasPartialStar = rating % 1 !== 0;
    const partialFill = rating % 1;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <div key={`full-${i}`} className="relative">
          <Star size={config.star} className="fill-amber-400 text-amber-400" />
        </div>
      );
    }

    // Partial star
    if (hasPartialStar) {
      stars.push(
        <div
          key="partial"
          className="relative inline-block"
          style={{ width: config.star, height: config.star }}
        >
          <Star
            size={config.star}
            className="text-gray-300 absolute top-0 left-0"
          />
          <div
            className="overflow-hidden absolute top-0 left-0"
            style={{ width: `${partialFill * 100}%`, height: config.star }}
          >
            <Star
              size={config.star}
              className="fill-amber-400 text-amber-400"
            />
          </div>
        </div>
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <div key={`empty-${i}`} className="relative">
          <Star size={config.star} className="text-gray-300" />
        </div>
      );
    }

    return stars;
  };

  return (
    <div className="inline-flex items-center">
      {/* Stars Container */}
      <div className={`flex items-center ${config.gap}`}>{renderStars()}</div>

      {/* Rating and Review Count */}
      <div className={`ml-3 flex items-center ${config.gap} ${config.text}`}>
        <span className="font-semibold text-gray-800">{rating.toFixed(1)}</span>
        <span className="text-gray-500 text-xs">
          ({reviewCount.toLocaleString()}{" "}
          {reviewCount === 1 ? "review" : "reviews"})
          
        </span>
      </div>
    </div>
  );
};

export default StarRating;
