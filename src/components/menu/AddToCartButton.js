import { useState } from 'react';

export default function AddToCartButton({
  hasSizesOrExtras, onClick, basePrice, image
}) {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleOrderClick = async () => {
    if (isPlacingOrder) return;
    setIsPlacingOrder(true);
    await placeOrder(); // Your async order placement function
    setIsPlacingOrder(false);
  };

  if (!hasSizesOrExtras) {
    return (
      <div className="mt-4">
        {image && image.trim() !== '' ? (
          <div onClick={onClick} className="mt-4 bg-primary text-white rounded-full px-8 py-2">
            Add to cart ${basePrice}
          </div>
        ) : (
          <div onClick={onClick} className="mt-4 bg-primary text-white rounded-full px-8 py-2">
            Add to cart ${basePrice}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      <span>Add to cart (from ${basePrice})</span>
    </button>
  );
}
