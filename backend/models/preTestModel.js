import mongoose from 'mongoose';

const preTestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    absen: {
      type: Number,
      required: true,
      unique: true,
    },
    kelas: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PreTest = mongoose.model('PreTest', preTestSchema);

export default PreTest;