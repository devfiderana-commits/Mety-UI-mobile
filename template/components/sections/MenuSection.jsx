export default function MenuSection({ dishes }) {
  return (
    <section id="menu" className="menu-section">
      <div className="section-heading">
        <p className="eyebrow">Menu</p>
        <h2>Signature dishes</h2>
      </div>

      <div className="cards-grid" aria-label="Featured menu cards">
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
      </div>
    </section>
  );
}
