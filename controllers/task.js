const { Task } = require("../models/task");
const validateTask = require("../validators/taskValid");
const messages = require("../helpers/messages.json");

async function addTask(req, res) {
  const { error } = await validateTask(req.body);

  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  let task = new Task(req.body);
  task.addedBy = req.user._id;

  await task.save();

  return res
    .status(200)
    .send({ task, success: true, message: messages.addSuccsess });
}

async function getTasks(req, res) {
  const { select } = req.query;
  let filter = { closed: false };

  if (req.user.role === "admin") {
    //get my tasks for admin
    if (select === "0") filter.assignedTo = req.user._id;
    //get all tasks for admin
    if (select === "1") filter = {};
    //Get closed tasks
    if (select === "2") filter.closed = true;
  }

  //only get my tasks if user
  if (req.user.role === "user") {
    filter.assignedTo = req.user._id;
    if (select === "1") filter.closed = true;
  }

  const count = await Task.countDocuments(filter);
  const tasks = await Task.find(filter)
    .sort("-createdAt")
    .select("-__v -updatedAt -addedBy")
    .populate("assignedTo", "email");

  return res
    .status(200)
    .send({ tasks, count, success: true, message: messages.getSuccess });
}

async function getTaskById(req, res) {
  const task = await Task.findOne({ _id: req.params.id })
    .select("-__v -updatedAt -addedBy")
    .populate("assignedTo", "email");

  if (!task)
    return res
      .status(404)
      .send({ task: null, success: false, message: messages.notFound });

  return res
    .status(200)
    .send({ task, success: true, message: messages.getSuccess });
}

async function editTask(req, res) {
  const { isCompleted } = req.body;

  const filter = { _id: req.params.id };

  if (req.user.role === "user") {
    filter.assignedTo = req.user._id;
  }

  const exist = await Task.findOne(filter)
    .select("-__v -updatedAt -addedBy")
    .populate("assignedTo", "email");

  if (!exist)
    return res
      .status(404)
      .send({ task: null, success: false, message: messages.notFound });

  const { error } = await validateTask(req.body);

  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  if (isCompleted && !exist.completedAt) req.body.completedAt = new Date();
  if (!isCompleted || isCompleted === "false") req.body.completedAt = null;

  const task = await Task.findOneAndUpdate(
    filter,
    { $set: req.body },
    { new: true }
  )
    .select("-__v -updatedAt -addedBy")
    .populate("assignedTo", "email");

  if (!task)
    return res
      .status(404)
      .send({ task: null, success: false, message: messages.notFound });

  return res
    .status(200)
    .send({ task, success: true, message: messages.updateSuccess });
}

async function deleteTask(req, res) {
  const task = await Task.findOneAndDelete({ _id: req.params.id })
    .select("-__v -updatedAt -addedBy")
    .populate("assignedTo", "email");

  if (!task)
    return res
      .status(404)
      .send({ task: null, success: false, message: messages.notFound });

  return res
    .status(200)
    .send({ task, success: true, message: messages.deleteSuccess });
}

async function closeMyTodo(req, res) {
  const incompletedtaskCounts = await Task.countDocuments({
    assignedTo: req.user._id,
    isCompleted: false,
  });

  if (incompletedtaskCounts > 0)
    return res
      .status(400)
      .send({ task: null, success: false, message: messages.notCompleted });

  await Task.updateMany(
    { assignedTo: req.user._id },
    { $set: { closed: true } }
  );

  return res
    .status(200)
    .send({ success: true, message: messages.updateSuccess });
}

module.exports = {
  addTask,
  getTasks,
  getTaskById,
  editTask,
  deleteTask,
  closeMyTodo,
};
