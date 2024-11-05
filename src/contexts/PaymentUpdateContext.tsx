import React, { createContext, useContext, useState } from "react";

interface PaymentUpdateContextType {
  needsUpdate: boolean;
  setNeedsUpdate: (value: boolean) => void;
}

const PaymentUpdateContext = createContext<PaymentUpdateContextType | undefined>(undefined);

interface PaymentUpdateProviderProps {
  children: React.ReactNode;
}

export const PaymentUpdateProvider: React.FC<PaymentUpdateProviderProps> = ({ children }) => {
  const [needsUpdate, setNeedsUpdate] = useState(false);

  return (
    <PaymentUpdateContext.Provider value={{ needsUpdate, setNeedsUpdate }}>
      {children}
    </PaymentUpdateContext.Provider>
  );
};

export const usePaymentUpdate = () => {
  const context = useContext(PaymentUpdateContext);
  if (!context) {
    throw new Error("usePaymentUpdate must be used within a PaymentUpdateProvider");
  }
  return context;
};
