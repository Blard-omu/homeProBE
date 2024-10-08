import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const PropertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      default: 3,
    },
    bathrooms: {
      type: Number,
      default: 3,
    },
    sqm: {
      type: Number,
      default: 3000,
    },
    Address: [
      {
        street: {
          type: String,
        },
        city: {
          type: String,
          required: true,
        },
      },
    ],
    propertyType: {
      type: String,
      default: "Apartment",
      enum: ["Appartment", "House", "Office", "Villa", "Land"],
    },
    location: {
      type: String,
      default: "Lagos",
      enum: ["Lagos, Ogun, Ibadan, Abuja, Porharcourt, Kaduna, Enugu,Others"],
    },
    images: [
      {
        url: {
          type: String,
        },
        imagePublicId: {
          type: String,
        },
      },
    ],
    propertyFeatures: [
      {
        location: {
          type: String,
        },
        area: {
          type: String,
        },
        interior: {
          type: String,
        },
        security: {
          type: String,
        },
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    agentId: {
      type: ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", PropertySchema);
