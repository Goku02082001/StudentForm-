import Submission from "../models/Submission.js";

const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Submissions fetched", data: submissions });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch submissions", error: error.message });
  }
};

export default getSubmissions