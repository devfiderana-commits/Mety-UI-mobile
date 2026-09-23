export default function BookingSection() {
  return (
    <section id="booking" className="booking-section">
      <div className="booking-card">
        <div>
          <p className="eyebrow">Book a Table</p>
          <h2>Reserve your next healthy moment.</h2>
        </div>

        <form className="booking-form">
          <input type="text" placeholder="Your name" aria-label="Your name" />
          <input type="email" placeholder="Email" aria-label="Email" />
          <input type="date" aria-label="Reservation date" />
          <button type="submit">Reserve</button>
        </form>
      </div>
    </section>
  );
}
