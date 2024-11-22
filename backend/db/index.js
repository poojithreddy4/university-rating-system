import mongoose from "mongoose";
import { MONGO_URI } from "../config.js";
import universitiesList from "../data/universities.json" assert { type: "json" };
import University from "../models/university-model.js";

const connectToDB = () => {
  mongoose
    .connect(MONGO_URI)
    .then(async () => {
      console.log("Connected to MongoDB");

      //   Seed the DB
      await seedUniversities();
    })
    .catch((err) => {
      console.log(err);
      console.log("Failed to connect to MongoDB");
    });
};

export default connectToDB;

const seedUniversities = async () => {
  const alreadySeeded = (await University.countDocuments().limit(1)) > 0;

  if (alreadySeeded) return;

  await University.insertMany(universitiesList);
  console.log("Universities list seeding successful");
};
