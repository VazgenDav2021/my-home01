import express from "express";
import {
  addProduct,
  changeProduct,
  getAllProducts,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/add", addProduct);
router.put("/change", changeProduct);

export default router;
