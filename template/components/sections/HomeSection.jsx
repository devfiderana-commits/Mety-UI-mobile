export default function HomeSection() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero-title">
        <span>SIMPLE</span>
        <span className="hero-separator">&</span>
        <span>QUICK</span>
      </h1>

      <div className="hero-figure">
        <img
          src="https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80"
          alt="Healthy gourmet plate"
        />
      </div>
    </section>
  );
}
