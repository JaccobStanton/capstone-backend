const mongoose = require("mongoose");

// MongoDB schema for image collections
const ImageCollectionSchema = new mongoose.Schema({
  collectionName: { type: String, required: true },
  images: [
    {
      url: { type: String, required: true },
      name: { type: String, required: true },
      date: { type: String, required: true },
      time: { type: String, required: true },
      imgType: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("ImageCollection", ImageCollectionSchema);
