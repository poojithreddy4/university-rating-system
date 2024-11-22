import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  image: String,
  finalRating: Number,
});

const University = mongoose.model("universities", schema, "universities");
export default University;
