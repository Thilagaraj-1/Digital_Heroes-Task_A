import { useState } from "react";
import { createLead } from "../api/api.js";
import "./LeadForm.css";

const BUDGET_OPTIONS = ["<₹10k", "₹10k–50k", "₹50k–1L", "₹1L+"];

const initialForm = {
  name: "",
  email: "",
  budget: "",
  message: "",
};

function validate(form) {
  const errors = {};

  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = "Enter your full name (at least 2 characters).";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.budget) {
    errors.budget = "Select a budget range.";
  }

  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = "Tell us a bit more (at least 10 characters).";
  }

  return errors;
}

function LeadForm({ formRef }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    setServerError("");

    try {
      await createLead(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      const apiErrors = err.response?.data?.errors;
      if (apiErrors) {
        setErrors(apiErrors);
        setServerError("Please fix the highlighted fields.");
      } else {
        setServerError(
          "Something went wrong while sending your request. Please try again."
        );
      }
    }
  };

  if (status === "success") {
    return (
      <section className="lead-form" ref={formRef} id="lead-form">
        <div className="container lead-form__success">
          <div className="lead-form__success-icon">✓</div>
          <h2>Thanks — your requirement is in.</h2>
          <p>We've received your details and will get back to you shortly.</p>
          <button
            className="lead-form__secondary-btn"
            onClick={() => setStatus("idle")}
          >
            Submit another requirement
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="lead-form" ref={formRef} id="lead-form">
      <div className="container lead-form__inner">
        <div className="lead-form__intro">
          <h2>Tell us what you need</h2>
          <p>
            Share a few details and our team will reach out to scope your
            project.
          </p>
        </div>

        <form
          className="lead-form__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="lead-form__field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <span className="lead-form__error">{errors.name}</span>}
          </div>

          <div className="lead-form__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <span className="lead-form__error">{errors.email}</span>}
          </div>

          <div className="lead-form__field">
            <label htmlFor="budget">Budget</label>
            <select
              id="budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              aria-invalid={Boolean(errors.budget)}
            >
              <option value="">Select a range</option>
              {BUDGET_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.budget && <span className="lead-form__error">{errors.budget}</span>}
          </div>

          <div className="lead-form__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="What are you looking to build?"
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message && <span className="lead-form__error">{errors.message}</span>}
          </div>

          {serverError && <p className="lead-form__server-error">{serverError}</p>}

          <button
            type="submit"
            className="lead-form__submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending..." : "Submit requirement"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default LeadForm;
