import React, { createContext, useContext, useState } from 'react';

const SeatControl = createContext();

export const SeatProvider = ({ children }) => {
  const [seats, setSeats] = useState(Array(42).fill(false));

  const controlValue = {
    seats,
    setSeats,
  };

  return (
    <SeatControl.Provider value={controlValue}>{children}</SeatControl.Provider>
  );
};

export const useSeatControl = () => {
  return useContext(SeatControl);
};