import React from "react";
import { SpellbookPaymentModal } from "./SpellbookPaymentModal";

export const PremiumGateWrapper = ({ user, children }) => {
  if (user.subscriptionTier === "PREMIUM") return children;

  return <SpellbookPaymentModal />;
};
