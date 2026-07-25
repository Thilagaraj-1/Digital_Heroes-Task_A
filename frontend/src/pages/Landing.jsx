import { useRef } from "react";
import Hero from "../components/Hero.jsx";
import LeadForm from "../components/LeadForm.jsx";
import Footer from "../components/Footer.jsx";

function Landing() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing">
      <Hero onCtaClick={scrollToForm} />
      <LeadForm formRef={formRef} />
      <Footer />
    </div>
  );
}

export default Landing;
