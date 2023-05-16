import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ login: req.body.login });
    if (!admin) return next(createError(404, "admin not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or family login!"));

    const token = jwt.sign(
      { id: admin._id, isAdmin: admin.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = admin._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const registerdAmin = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newAdmin = new Admin({
      isAdmin: true,
      ...req.body,
      password: hash,
    });

    await newAdmin.save();
    const { password: pass, ...rest } = newAdmin._doc;
    res.status(200).send({ message: "Admin has been created", data: rest });
  } catch (err) {
    next(err);
  }
};
