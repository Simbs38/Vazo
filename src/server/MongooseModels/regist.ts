
import mongoose from 'mongoose'

const RegistSchema = new mongoose.Schema({
  vaseId: {
    type: Number,
    required: true
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  text: {
    type: String
  }
}, { timestamps: true })

const Regist = mongoose.model('Regist', RegistSchema)

export { Regist }
