const mongoose = require("mongoose");

const BUDGET_OPTIONS = ["<₹10k", "₹10k–50k", "₹50k–1L", "₹1L+"];
const STATUS_OPTIONS = ["New", "Contacted", "Closed"];

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [100, "Name must be under 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
  },
  budget: {
    type: String,
    required: [true, "Budget is required"],
    enum: {
      values: BUDGET_OPTIONS,
      message: "Please select a valid budget range",
    },
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    minlength: [10, "Message must be at least 10 characters"],
    maxlength: [1000, "Message must be under 1000 characters"],
  },
  status: {
    type: String,
    enum: {
      values: STATUS_OPTIONS,
      message: "Please select a valid status",
    },
    default: "New",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

leadSchema.statics.BUDGET_OPTIONS = BUDGET_OPTIONS;
leadSchema.statics.STATUS_OPTIONS = STATUS_OPTIONS;

module.exports = mongoose.model("Lead", leadSchema);
