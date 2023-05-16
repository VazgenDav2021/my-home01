import mongoose from "mongoose";
const { Schema } = mongoose;

// relatedProductSchema schema
const relatedProductSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  detailedText: { type: String },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
});

// Product schema
const productSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  detailedText: { type: String },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  relatedProducts: [{ type: Schema.Types.ObjectId, ref: relatedProductSchema }],
});

// Subcategory schema
const subcategorySchema = new Schema({
  name: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

// Category schema
const categorySchema = new Schema({
  name: { type: String, required: true },
  subcategories: [{ type: Schema.Types.ObjectId, ref: "Subcategory" }],
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

export const Category = mongoose.model("Category", categorySchema);
export const Subcategory = mongoose.model("Subcategory", subcategorySchema);
export const Product = mongoose.model("Product", productSchema);
