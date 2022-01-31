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
}, {
  timestamps: { createdAt: true, updatedAt: false }
})

const Regist = mongoose.model('Regist', RegistSchema)

export { Regist }
