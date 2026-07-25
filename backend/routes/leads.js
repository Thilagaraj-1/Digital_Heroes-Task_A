const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// Helper: run server-side validation on incoming lead data
function validateLeadInput({ name, email, budget, message }) {
  const errors = {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
    errors.email = "Please provide a valid email";
  }

  if (!budget || !Lead.BUDGET_OPTIONS.includes(budget)) {
    errors.budget = "Please select a valid budget range";
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

// POST /api/leads - create a new lead
router.post("/", async (req, res) => {
  try {
    const { name, email, budget, message } = req.body;
    const errors = validateLeadInput({ name, email, budget, message });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const lead = await Lead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      budget,
      message: message.trim(),
    });

    return res.status(201).json({ success: true, data: lead });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ success: false, errors });
    }
    console.error("Error creating lead:", err.message);
    return res.status(500).json({ success: false, message: "Server error while creating lead" });
  }
});

// GET /api/leads - fetch all leads (supports optional ?search= query)
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter = { $or: [{ name: regex }, { email: regex }] };
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: leads });
  } catch (err) {
    console.error("Error fetching leads:", err.message);
    return res.status(500).json({ success: false, message: "Server error while fetching leads" });
  }
});

// PATCH /api/leads/:id - update a lead's status
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !Lead.STATUS_OPTIONS.includes(status)) {
      return res.status(400).json({
        success: false,
        errors: { status: "Status must be one of: New, Contacted, Closed" },
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    return res.status(200).json({ success: true, data: lead });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid lead id" });
    }
    console.error("Error updating lead:", err.message);
    return res.status(500).json({ success: false, message: "Server error while updating lead" });
  }
});

module.exports = router;
