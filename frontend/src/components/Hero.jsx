import "./Hero.css";

function Hero({ onCtaClick }) {
  return (
    <header className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="hero__eyebrow">LeadDesk Mini</span>
          <h1 className="hero__title">
            Capture every lead. <br /> Never lose track of one.
          </h1>
          <p className="hero__subtitle">
            A lightweight lead intake form for your website, paired with a
            simple desk to track each lead from first message to closed deal.
          </p>
          <button className="hero__cta" onClick={onCtaClick}>
            Send us your requirement
          </button>
        </div>

        <div className="hero__pipeline" aria-hidden="true">
          <div className="hero__pipeline-card">
            <div className="hero__pipeline-row">
              <span className="hero__dot hero__dot--new" />
              <span>New</span>
            </div>
            <div className="hero__pipeline-line" />
            <div className="hero__pipeline-row">
              <span className="hero__dot hero__dot--contacted" />
              <span>Contacted</span>
            </div>
            <div className="hero__pipeline-line" />
            <div className="hero__pipeline-row">
              <span className="hero__dot hero__dot--closed" />
              <span>Closed</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
