// PaymentEngine.js
// Handles payments, refunds, and credits

export const PaymentEngine = {
  payments: [],

  recordPayment({ userId, amount, method }) {
    const payment = {
      paymentId: `pay_${Date.now()}`,
      userId,
      amount,
      method,
      status: "PAID",
      createdAt: new Date().toISOString()
    };
    this.payments.push(payment);
    return payment;
  },

  refund(paymentId) {
    const payment = this.payments.find(p => p.paymentId === paymentId);
    if (!payment) return null;

    payment.status = "REFUNDED";
    return payment;
  }
};
