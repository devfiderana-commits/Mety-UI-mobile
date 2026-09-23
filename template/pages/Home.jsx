import Cards from "../components/ui/cards";

const dishes = [
  {
    name: "Crunchy Citrus Bowl",
    calories: "420 kcal",
    prep: "14 min",
    servings: "2 people",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Garden Glow Salad",
    calories: "310 kcal",
    prep: "11 min",
    servings: "2 people",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Harvest Quinoa",
    calories: "390 kcal",
    prep: "16 min",
    servings: "3 people",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sunrise Greens",
    calories: "350 kcal",
    prep: "9 min",
    servings: "2 people",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Home() {
  return (
    <main className="container">
      <section className="hero" aria-labelledby="hero-title">
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

      <section className="cards-component" aria-label="Animated cards">
        <Cards />
      </section>

      <section className="cards-grid" aria-label="Featured menu cards">
        {dishes.map((dish) => (
          <article className="food-card" key={dish.name}>
            <div className="card-thumb">
              <img src={dish.image} alt={dish.name} />
            </div>

            <h2 className="card-title">{dish.name}</h2>
            <p className="card-calories">{dish.calories}</p>

            <div className="card-meta">
              <div className="meta-item">
                <label>Prep</label>
                <span>{dish.prep}</span>
              </div>
              <div className="meta-item">
                <label>Serves</label>
                <span>{dish.servings}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="testimonial-section" aria-label="Customer testimonial">
        <div className="testimonial-card">
          <div className="glow-layer glow-white" aria-hidden="true" />
          <div className="glow-layer glow-orange" aria-hidden="true" />

          <div className="card-content">
            <div className="author-info">
              <div className="avatar" aria-hidden="true" />
              <div>
                <p className="author-name">Sophia Hart</p>
                <p className="author-role">Food Blogger</p>
              </div>
            </div>

            <p className="testimonial-text">
              “The flavor balance is incredible — every dish feels fresh,
              vibrant, and thoughtfully made, with a warm, premium
              presentation.”
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
