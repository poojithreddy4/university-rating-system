import mongoose from "mongoose";

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,

  // Relations
  favouriteUniversities: {
    type: Map,
    of: Boolean,
  },
});

schema.methods.generateAuthToken = function () {
  return {
    id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
  };
};

const User = mongoose.model("user", schema);

export default User;
