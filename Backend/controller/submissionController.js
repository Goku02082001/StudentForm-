import Submission from "../models/Submission.js";

export const submitAssignment = async (req, res) => {
    if (!req.file || !req.file.path) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
    const { title, description, studentName, studentId } = req.body;
    const attachment = req.file ? req.file.path : null;
console.log(req.file)
    const newSubmission = new Submission({
      title,
      description,
      studentName,
      studentId,
      attachment
    });

    await newSubmission.save();
    res.status(200).json({ message: "Submission successful", data: newSubmission });
  } catch (error) {
    res.status(500).json({ message: "Submission failed", error: error.message });
  }
};
