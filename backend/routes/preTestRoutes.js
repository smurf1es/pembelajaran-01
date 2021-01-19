import express from 'express';
const router = express.Router();
import {
  getUsers,
  registerUser,
  deleteUser,
  getUserById,
  updateUser
} from '../controllers/preTestController.js';

router.route('/').post(registerUser).get(getUsers);
router
  .route('/:absen')
  .delete(deleteUser)
  .get(getUserById)
  .put(updateUser);

export default router;