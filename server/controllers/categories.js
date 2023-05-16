import { Category, Subcategory } from "../models/Category.js";

export const addCategories = async (req, res, next) => {
  try {
    const { name: categoryName, subcategories } = req.body;
    const newCategory = new Category({ name: categoryName });

    const transformedSubs = await Promise.all(
      subcategories.map(async (data) => {
        const subcategory = new Subcategory(data);
        await subcategory.save();
        return subcategory._id;
      })
    );

    newCategory.subcategories.push(...transformedSubs);
    await newCategory.save();

    res
      .status(200)
      .send({ message: "Category has been created", data: newCategory });
  } catch (err) {
    next(err);
  }
};

export const changeCategory = async (req, res, next) => {
  try {
    const { categoryId, ...rest } = req.body;
    const updateCategory = await Category.findByIdAndUpdate(
      { _id: categoryId },
      { $set: rest },
      { new: true }
    ).exec();

    res.status(200).json(updateCategory);
  } catch (err) {
    next(err);
  }
};

export const getCurrentCategory = async (req, res, next) => {
  try {
    const categoryName = req.params.name.split("-").join(" ");
    const category = await Category.findOne({ name: categoryName })
      .populate({
        path: "subcategories",
        populate: {
          path: "products",
          model: "Product",
        },
      })
      .populate("products");

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({})
      .populate("subcategories")
      .populate("products");
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

export const deleteCurrentCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted.");
  } catch (err) {
    next(err);
  }
};
