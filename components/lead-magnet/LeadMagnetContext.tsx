"use client";

import { createContext, useContext } from "react";

interface LeadMagnetContextType {
  openModal: () => void;
}

export const LeadMagnetContext = createContext<LeadMagnetContextType>({
  openModal: () => {},
});

export const useLeadMagnet = () => useContext(LeadMagnetContext);
