import React from "react";

const CartDrawerSkeleton = () => {
  return (
    <div className="cart-drawer-body">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="cart-item">
          <div className="w-20 h-20 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="cart-item-details">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartDrawerSkeleton;
