export default function AboutUsSection() {
  return (
    <section id="about" className="info-section about-section">
      <div className="section-heading">
        <p className="eyebrow">About Us</p>
        <h2>Fresh ingredients, honest flavor.</h2>
      </div>

      <div className="about-grid">
        <div className="about-copy">
          <p>
            AgroMill is a modern dining experience built around seasonal produce,
            vibrant plates, and a warm neighborhood atmosphere. Every recipe is
            designed to feel light, nourishing, and memorable.
          </p>
          <p>
            From market-fresh salads to slow-crafted bowls, we create meals that
            balance comfort and vitality in every bite.
          </p>
        </div>

        <div className="stats-panel">
          <div>
            <strong>12+</strong>
            <span>Years of flavor</span>
          </div>
          <div>
            <strong>3k</strong>
            <span>Happy guests</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Fresh sourcing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
