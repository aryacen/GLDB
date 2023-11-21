import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['pending','accepted','declined'],
    default: "pending"
  },
  allDay: {
    type: Boolean,
    required: true
  }
});

export default eventSchema;