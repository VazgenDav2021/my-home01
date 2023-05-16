import express from "express";
import {
  addCategories,
  changeCategory,
  getAllCategories,
  getCurrentCategory,
  deleteCurrentCategory,
} from "../controllers/categories.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:name", getCurrentCategory);
router.delete("/:id", deleteCurrentCategory);
router.post("/add", addCategories);
router.put("/change", changeCategory);
export default router;
