import asyncHandler from 'express-async-handler';
import PreTestModel from '../models/preTestModel.js';

// @desc GET all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await PreTestModel.find({}).sort({ absen: +1 });
  res.json(users);
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, absen, kelas } = req.body;
  const userExists = await PreTestModel.findOne({ absen });

  if (userExists) {
    res.status(400);
    throw new Error('Data already exists');
  }

  const user = await PreTestModel.create({
    name,
    absen,
    kelas,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      absen: user.absen,
      kelas: user.kelas
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const { absen } = req.params;
  const user = await PreTestModel.findOne({ absen });

  if (user) {
    await user.remove();
    res.json({ message: 'Data removed' });
  } else {
    res.status(404);
    throw new Error('Data not found');
  }
});

// @desc GET user by id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const { absen } = req.params;
  const user = await PreTestModel.findOne({ absen });
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Data not found');
  }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const { absen } = req.params;
  const user = await PreTestModel.findOne({ absen });

  if (user) {
    user.name = req.body.name || user.name,
    user.absen = req.body.absen || user.absen,
    user.kelas = req.body.kelas || user.kelas

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      absen: updatedUser.absen,
      kelas: updatedUser.kelas,
      message: 'Data updated'
    });
  } else {
    res.status(404);
    throw new Error('Data not found!');
  }
});

export {
  registerUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser
};