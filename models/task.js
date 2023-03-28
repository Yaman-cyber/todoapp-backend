const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String },

    dueDate: { type: Date, default: null },

    priority: { type: String, enum: ["low", "medium", "high"], default: null },

    category: { type: String },

    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },

    addedBy: { type: mongoose.Types.ObjectId, ref: "User" },

    isCompleted: { type: Boolean, default: false },

    completedAt: { type: Date, default: null },

    closed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

exports.Task = Task;
