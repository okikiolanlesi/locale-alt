import { getSlug } from "../utils/index";
import mongoose, { Document, Schema } from "mongoose";

interface ILocalGovernmentArea extends Document {
  name: string;
  description: string;
  slug: string;
  state: any;
}

const localGovernmentAreaSchema = new Schema<ILocalGovernmentArea>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    state: {
      type: mongoose.Types.ObjectId,
      ref: "State",
      required: [true, "state is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

localGovernmentAreaSchema.pre("save", function (next) {
  this.slug = getSlug(this.name);
  next();
});

const LocalGovernmentArea = mongoose.model<ILocalGovernmentArea>(
  "LocalGovernmentArea",
  localGovernmentAreaSchema
);

export default LocalGovernmentArea;
