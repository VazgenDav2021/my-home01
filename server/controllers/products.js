import { Product } from "../models/Category.js";

export const addProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    newProduct.save();
    res
      .status(200)
      .send({ message: "Product has been created", data: newProduct });
  } catch (err) {
    next(err);
  }
};

export const changeProduct = async (req, res, next) => {
  try {
    const { productId, ...rest } = req.body;
    const updateCategory = await Product.findByIdAndUpdate(
      { _id: productId },
      { $set: rest },
      { new: true }
    ).exec();

    res.status(200).json(updateCategory);
  } catch (err) {
    next(err);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    console.log({ relatedProducts });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
