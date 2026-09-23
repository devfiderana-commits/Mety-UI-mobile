export default function Contact() {
  return (
    <main className="container">
      <section className="contact-page">
        <div className="shader-panel">
          <div className="shader-glow shader-glow-one" aria-hidden="true" />
          <div className="shader-glow shader-glow-two" aria-hidden="true" />
          <div className="shader-glow shader-glow-three" aria-hidden="true" />

          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>Book your table</h2>
          </div>

          <div className="contact-layout">
            <div className="contact-details">
              <div className="contact-card">
                <h3>Location</h3>
                <p>18 Orchard Lane, Greenfield</p>
              </div>
              <div className="contact-card">
                <h3>Email</h3>
                <p>hello@agromill.com</p>
              </div>
              <div className="contact-card">
                <h3>Phone</h3>
                <p>+1 (415) 320-2847</p>
              </div>
            </div>

            <form className="contact-form">
              <label>
                Name
                <input type="text" placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" placeholder="Email" />
              </label>
              <label>
                Date
                <input type="date" />
              </label>
              <label>
                Message
                <textarea rows="4" placeholder="Tell us what you need" />
              </label>
              <button type="submit">Reserve</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
