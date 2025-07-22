import React, { createContext, useContext, useState, useEffect } from "react";

const WorkBagContext = createContext();

export const useWorkBag = () => {
  return useContext(WorkBagContext);
};

export const WorkBagProvider = ({ children }) => {
  const [workBagItems, setWorkBagItems] = useState(() => {
    try {
      const localData = localStorage.getItem("workBag");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse work bag data from localStorage", error);
      return [];
    }
  });
  const [isWorkBagOpen, setIsWorkBagOpen] = useState(false);
  const [checkoutInitiated, setCheckoutInitiated] = useState(false);

  useEffect(() => {
    localStorage.setItem("workBag", JSON.stringify(workBagItems));
  }, [workBagItems]);

  const addToWorkBag = (item) => {
    setWorkBagItems((prevItems) => {
      const isItemInWorkBag = prevItems.find((workBagItem) => workBagItem.id === item.id);
      if (isItemInWorkBag) {
        return prevItems;
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    openWorkBag();
  };

  const removeFromWorkBag = (id) => {
    setWorkBagItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return acc;
          return [...acc, { ...item, quantity: item.quantity - 1 }];
        }
        return [...acc, item];
      }, [])
    );
  };

  const clearWorkBag = () => {
    setWorkBagItems([]);
  };

  const openWorkBag = () => {
    setIsWorkBagOpen(true);
  };

  const closeWorkBag = () => {
    setIsWorkBagOpen(false);
  };

  const value = {
    workBag: workBagItems,
    addToWorkBag,
    removeFromWorkBag,
    clearWorkBag,
    isWorkBagOpen,
    openWorkBag,
    closeWorkBag,
    checkoutInitiated,
    setCheckoutInitiated,
  };

  return <WorkBagContext.Provider value={value}>{children}</WorkBagContext.Provider>;
};
