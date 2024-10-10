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
      type: String,
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
    state: {
      type: String,
      default: "LAGOS",
      enum: ["LAGOS", "IBADAN", "ABUJA", "OGUN", "KANO", "Enugu"],
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
    propertyType: {
      type: String,
      default: "Apartment",
      enum: ["Apartment", "House", "Office", "Villa", "Land", "Stuido", "Penthouse", "Duplex","Bungalow","Mansion"],
    },
    propertyFeatures: {
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
      gated: {
        type: String,
        default: "Yes",
      },
    },
    keyFeatures: [{
      key: {
        type: String, 
      },
      feature: {
        type: String,
      },
    }],
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
