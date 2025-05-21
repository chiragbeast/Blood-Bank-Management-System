import mongoose from 'mongoose';

// Define the TokenBlacklist schema
const tokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1d' } // Token expires after 1 day
});

// Create and export the model
const TokenBlacklist = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
export default TokenBlacklist;