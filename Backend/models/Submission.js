import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  attachment: { type: String },
  studentName: { type: String, required: true },
  studentId: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Submission", submissionSchema);
