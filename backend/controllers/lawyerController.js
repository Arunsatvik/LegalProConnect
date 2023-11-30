import Booking from "../models/BookingSchema.js";
import Lawyer from "../models/LawyerSchema.js";

// update Lawyer
export const updateLawyer = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedLawyer = await Lawyer.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedLawyer,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};

// delete Lawyer
export const deleteLawyer = async (req, res) => {
  const id = req.params.id;

  try {
    await Lawyer.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

// getSingle Lawyer
export const getSingleLawyer = async (req, res) => {
  const id = req.params.id;

  try {
    const lawyer = await Lawyer.findById(id)
      .populate("reviews")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Successful",
      data: lawyer,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

// getAll Lawyer
export const getAllLawyer = async (req, res) => {
  try {
    const { query } = req.query;
    let lawyers;

    if (query) {
      // Search based on lawyer name or specialization
      lawyers = await Lawyer.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive regex search on the name field
          { specialization: { $regex: query, $options: "i" } }, // Case-insensitive regex search on the specialization field
        ],
      }).select("-password");
    } else {
      // Get all approved lawyers
      lawyers = await Lawyer.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res.status(200).json({
      success: true,
      message: "Successful",
      data: lawyers,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

export const getLawyerProfile = async (req, res) => {
  const userId = req.userId;

  try {
    // let user = null;
    const user = await Lawyer.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const appointments = await Booking.find({ lawyer: userId });

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Successfully ",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong! cannot get!" });
  }
};
