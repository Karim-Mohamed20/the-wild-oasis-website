"use client"
import { createContext, useContext, useState, type ReactNode } from "react";

type ReservationRange = {
  from?: Date;
  to?: Date;
};

type ReservationContextValue = {
  range: ReservationRange;
  setRange: React.Dispatch<React.SetStateAction<ReservationRange>>;
  resetRange: () => void;
};

const ReservationContext = createContext<ReservationContextValue | undefined>(undefined);

function ReservationProvider({ children }: { children: ReactNode }) {
  const initialState: ReservationRange = { from: undefined, to: undefined };

  const [range, setRange] = useState<ReservationRange>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation }