const Joi = require("joi");
const { User } = require("../models/user");

module.exports = async function (task) {
  let result = {};

  const schema = Joi.object({
    title: Joi.string().required(),

    description: Joi.string().required(),

    priority: Joi.string().valid("low", "medium", "high").optional(),

    assignedTo: Joi.string()
      .pattern(/^[a-f\d]{24}$/i)
      .optional(),

    dueDate: Joi.date().optional(),

    isCompleted: Joi.bool().optional(),
  });

  result = schema.validate(task);

  if (result.error) return result;

  if (task.assignedTo) {
    let user = await User.findOne({ _id: task.assignedTo });

    if (!user)
      result = { error: { details: [{ message: "User not found." }] } };
  }

  return result;
};
