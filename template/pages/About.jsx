import { WavyBackground } from "../components/ui/wavy-background";

export default function About() {
  return (
    <main className="container">
      <WavyBackground
        className="max-w-3xl mx-auto pb-20 pt-10"
        containerClassName="h-auto min-h-[380px] rounded-3xl overflow-hidden mt-8 mb-4"
        backgroundFill="#fef3e2"
        colors={["#d69055", "#c9a67d", "#8a5a34", "#e8d5c0", "#3b2a1a"]}
        waveOpacity={0.4}
        blur={12}
        speed="slow"
      >
        <p className="eyebrow text-center mb-3">About Us</p>
        <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-[#3b2a1a]">
          Fresh ingredients, honest flavor.
        </p>
      </WavyBackground>

      <section className="info-section about-section">
        <div className="about-grid">
          <div className="about-copy">
            <p>
              AgroMill is a modern dining experience built around seasonal
              produce, vibrant plates, and a warm neighborhood atmosphere. Every
              recipe is designed to feel light, nourishing, and memorable.
            </p>
            <p>
              From market-fresh salads to slow-crafted bowls, we create meals
              that balance comfort and vitality in every bite.
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
    </main>
  );
}
