// CalendarBookingEngine.js
// Handles booking creation, confirmation, completion, and lookup

export const CalendarBookingEngine = {
  bookings: [],

  createPendingBooking({
    userId,
    mysteryTarotName,
    memberId,
    readingType,
    date,       // "2026-04-25"
    startTime,  // "14:00"
    endTime     // "14:30"
  }) {
    const booking = {
      bookingId: `bk_${Date.now()}`,
      userId,
      mysteryTarotName,
      memberId,
      readingType,
      date,
      startTime,
      endTime,
      status: "PENDING",      // PENDING | CONFIRMED | COMPLETED | NO_SHOW | CANCELLED
      paymentStatus: "UNPAID",// UNPAID | PAID | REFUNDED
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.bookings.push(booking);
    return booking;
  },

  confirmBooking(bookingId) {
    const booking = this.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return null;

    booking.status = "CONFIRMED";
    booking.paymentStatus = "PAID";
    booking.updatedAt = new Date().toISOString();
    return booking;
  },

  cancelBooking(bookingId) {
    const booking = this.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return null;

    booking.status = "CANCELLED";
    booking.updatedAt = new Date().toISOString();
    return booking;
  },

  markCompleted(bookingId) {
    const booking = this.bookings.find(b => b.bookingId === bookingId);
    if (!booking) return null;

    booking.status = "COMPLETED";
    booking.updatedAt = new Date().toISOString();
    return booking;
  },

  getBookingsByUser(userId) {
    return this.bookings.filter(b => b.userId === userId);
  },

  getBooking(bookingId) {
    return this.bookings.find(b => b.bookingId === bookingId) || null;
  }
};
