import {
  adminAuth,
  authenticate,
  lawyerAuth,
  restrict,
} from "../auth/verifyToken.js";
import {
  deleteLawyer,
  getAllLawyer,
  getLawyerProfile,
  getSingleLawyer,
  updateLawyer,
} from "../controllers/lawyerController.js";
import express from "express";
// import { createReview } from "../controllers/reviewController.js";
import reviewRouter from "../routes/review.js";

const router = express.Router();

router.use("/:lawyerId/reviews", reviewRouter);

// get all lawyers
router.get("/", getAllLawyer);
router.get("/:id", getSingleLawyer);
router.put("/:id", authenticate, lawyerAuth, updateLawyer);
router.delete("/:id", authenticate, lawyerAuth, deleteLawyer);
router.get("/profile/me", authenticate, restrict(["lawyer"]), getLawyerProfile);

export default router;
