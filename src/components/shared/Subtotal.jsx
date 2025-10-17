
const Subtotal = ({
  length,
  left,
  totalPrice,
}) => {
  return (
    <div className="py-2">
      <h1
        className={
          `${left ? "text-left text-xs" : "text-right text-base"} font-semibold text-[#111] tracking-tight` +
          " font-['Amazon Ember','Arial','sans-serif']"
        }
      >
        <span className="text-[#565959]">Subtotal</span>
        <span className="text-[#0f1111]"> ({length} item{length !== 1 ? "s" : ""}): </span>
        <span className="font-bold text-lg text-[#B12704] align-middle ml-1">
          ₹{Number(totalPrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </span>
      </h1>
    </div>
  );
};

export default Subtotal;
