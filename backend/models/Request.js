import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    bloodType: { type: String, required: true },
    hospital: { type: String, required: true },
    city    : {type: String, required: true},
    contact: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
export default Request;
