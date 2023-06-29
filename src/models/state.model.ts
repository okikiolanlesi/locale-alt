import { getSlug } from "../utils/index";
import mongoose, { Document, Schema } from "mongoose";

interface IState extends Document {
  name: string;
  description: string;
  slug: string;
  alias: string;
  region: any;
}

const stateSchema = new Schema<IState>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    alias: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    region: {
      type: mongoose.Types.ObjectId,
      ref: "Region",
      required: [true, "region is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

stateSchema.virtual("LocalGovernmentAreas", {
  ref: "LocalGovernmentArea",
  foreignField: "state",
  localField: "_id",
});

stateSchema.pre("save", function (next) {
  this.slug = getSlug(this.name);
  next();
});

const State = mongoose.model<IState>("State", stateSchema);

export default State;
