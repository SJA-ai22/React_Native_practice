import React, { createContext, useContext, useState } from 'react';

const SeatControl = createContext();

export const SeatProvider = ({ children }) => {
  const [room1Seats, setRoom1Seats] = useState(Array(42).fill(false));
  const [room2Seats, setRoom2Seats] = useState(Array(30).fill(false));
  const [room3Seats, setRoom3Seats] = useState(Array(30).fill(false));

  const [selectedSeatInfo, setSelectedSeatInfo] = useState(null);

  const controlValue = {
    room1Seats,
    setRoom1Seats,
    room2Seats,
    setRoom2Seats,
    room3Seats,
    setRoom3Seats,
    selectedSeatInfo,
    setSelectedSeatInfo,
  };

  return (
    <SeatControl.Provider value={controlValue}>{children}</SeatControl.Provider>
  );
};

export const useSeatControl = () => {
  return useContext(SeatControl);
};
