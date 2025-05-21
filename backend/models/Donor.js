import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    bloodType: { type: String, required: true },
    contact: { type: String, required: true },
    lastDonationDate: { type: Date, default: null },
    city: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

const Donor = mongoose.model('Donor', donorSchema);
export default Donor;
