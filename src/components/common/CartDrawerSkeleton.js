import React from "react";

const CartDrawerSkeleton = () => {
  return (
    <div className="cart-drawer-body">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="cart-item animate-pulse">
          <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="cart-item-details">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartDrawerSkeleton;
