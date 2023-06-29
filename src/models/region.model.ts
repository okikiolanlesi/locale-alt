import { getSlug } from "../utils/index";
import mongoose, { Document, Schema } from "mongoose";

interface IRegion extends Document {
  name: string;
  description: string;
  slug: string;
}

const regionSchema = new Schema<IRegion>(
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
    slug: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

regionSchema.virtual("states", {
  ref: "State",
  foreignField: "region",
  localField: "_id",
});

regionSchema.pre("save", function (next) {
  this.slug = getSlug(this.name);
  next();
});

const Region = mongoose.model<IRegion>("Region", regionSchema);

export default Region;
