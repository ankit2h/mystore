
const Ratings = ({ ratings }) => {

  // ratings can be a number, or an object with .rate/.rating and .count
  let rate = 0;
  let count = undefined;
  if (typeof ratings === "number") {
    rate = ratings;
    count = ratings; // treat as both rate and count if only a number is provided
  } else if (typeof ratings === "object" && ratings !== null) {
    rate = ratings.rate ?? ratings.rating ?? 0;
    count = ratings.count ?? ratings.ratingCount ?? ratings.totalRatings ?? ratings.ratingsCount;
  }

  // Always show 5 stars, fill according to decimal rating
  const starColor = '#FFA41C'; // Amazon yellow
  const starSize = 18;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (rate >= i + 1) {
      // full star
      stars.push(
        <svg key={"full-" + i} width={starSize} height={starSize} viewBox="0 0 20 20" fill={starColor} xmlns="http://www.w3.org/2000/svg" className="inline-block">
          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
        </svg>
      );
    } else if (rate > i && rate < i + 1) {
      // half star
      stars.push(
        <span key={"half-" + i} style={{ width: starSize, height: starSize, display: "inline-block", position: "relative" }}>
          <svg width={starSize} height={starSize} viewBox="0 0 20 20" fill={starColor} style={{ position: "absolute", left: 0, top: 0, clipPath: "inset(0 50% 0 0)" }} xmlns="http://www.w3.org/2000/svg" className="inline-block">
            <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
          </svg>
          <svg width={starSize} height={starSize} viewBox="0 0 20 20" fill="#E3E6E6" style={{ position: "absolute", left: 0, top: 0, clipPath: "inset(0 0 0 50%)" }} xmlns="http://www.w3.org/2000/svg" className="inline-block">
            <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
          </svg>
        </span>
      );
    } else {
      // empty star
      stars.push(
        <svg key={"empty-" + i} width={starSize} height={starSize} viewBox="0 0 20 20" fill="#E3E6E6" xmlns="http://www.w3.org/2000/svg" className="inline-block">
          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
        </svg>
      );
    }
  }

  return (
    <div className="flex items-center gap-1">
      <span className="flex items-center gap-[2px]">
        {stars}
      </span>
      {Number.isFinite(count) && (
        <span className="text-[#007185] ml-1 text-xs font-bold align-middle hover:underline cursor-pointer select-none tracking-tight" style={{ fontFamily: 'Amazon Ember, Arial, sans-serif', letterSpacing: '-0.5px' }}>
          {count.toLocaleString()} ratings
        </span>
      )}
    </div>
  );
};

export default Ratings;
