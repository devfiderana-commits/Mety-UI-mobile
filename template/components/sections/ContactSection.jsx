export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h2>Visit or say hello.</h2>
      </div>

      <div className="contact-grid">
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
    </section>
  );
}
