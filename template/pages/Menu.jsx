import { HeroParallax } from "../components/ui/hero-parallax";

const menuItems = [
  { name: "Crunchy Citrus Bowl", price: "$18", description: "Avocado, greens, orange, seeds, sesame dressing.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80" },
  { name: "Garden Glow Salad", price: "$16", description: "Romaine, cucumber, herbs, radish and lemon vinaigrette.", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80" },
  { name: "Harvest Quinoa", price: "$20", description: "Quinoa, roasted vegetables, feta and tahini drizzle.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80" },
  { name: "Sunrise Greens", price: "$17", description: "Spinach, kiwi, mango, basil and citrus dressing.", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80" },
];

export default function Menu() {
  return (
    <main className="container">
      <section className="menu-page">
        <HeroParallax products={menuItems.map((item) => ({
          title: item.name,
          link: "#",
          thumbnail: item.image,
        }))} />

        <div className="section-heading">
          <p className="eyebrow">Menu</p>
          <h2>Signature dishes</h2>
        </div>

        <div className="menu-list">
          {menuItems.map((item) => (
            <article className="menu-item" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div className="menu-item-copy">
                <div className="menu-item-topline">
                  <h3>{item.name}</h3>
                  <span>{item.price}</span>
                </div>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
