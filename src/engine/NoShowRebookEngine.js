// Detects no-shows and creates credits for free rebooking

import { CalendarBookingEngine } from "./CalendarBookingEngine.js";

export const NoShowRebookEngine = {
  credits: [],

  markNoShowIfNeeded(currentTimeISO) {
    const now = new Date(currentTimeISO);
    CalendarBookingEngine.bookings.forEach(booking => {
      if (booking.status === "CONFIRMED") {
        const end = new Date(`${booking.date}T${booking.endTime}:00`);
        if (end < now) {
          booking.status = "NO_SHOW";
          booking.updatedAt = now.toISOString();
          this.createCreditForBooking(booking);
        }
      }
    });
  },

  createCreditForBooking(booking) {
    const credit = {
      creditId: `cr_${booking.bookingId}`,
      userId: booking.userId,
      source: "MISSED_PAID_READING",
      appliedBookingId: null,
      status: "AVAILABLE",
      createdAt: new Date().toISOString()
    };
    this.credits.push(credit);
    return credit;
  },

  applyCredit(userId, newBookingId) {
    const credit = this.credits.find(c => c.userId === userId && c.status === "AVAILABLE");
    if (!credit) return null;
    credit.status = "USED";
    credit.appliedBookingId = newBookingId;
    return credit;
  }
};
