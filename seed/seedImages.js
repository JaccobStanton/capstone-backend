const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true }, // Path to the image in public folder
  name: { type: String },
  date: { type: String },
  time: { type: String },
  imgType: { type: String },
});

const ImageCollectionSchema = new mongoose.Schema({
  collectionName: { type: String, required: true },
  images: [ImageSchema],
});

const ImageCollection = mongoose.model(
  "ImageCollection",
  ImageCollectionSchema
);

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@capstone.dhfn8.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

    // Define collections with relative paths to public/images
    const collections = [
      {
        collectionName: "Not Analyzed",
        images: [
          {
            url: "/images/001.png",
            name: "001.png",
            date: "2024-02-15",
            time: "14:30",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/002.png",
            name: "002.png",
            date: "2024-03-20",
            time: "09:45",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/003.png",
            name: "003.png",
            date: "2024-05-10",
            time: "18:20",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/004.png",
            name: "004.png",
            date: "2024-07-05",
            time: "08:15",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/005.png",
            name: "005.png",
            date: "2024-08-30",
            time: "21:40",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/006.png",
            name: "006.png",
            date: "2024-01-12",
            time: "13:25",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/007.png",
            name: "007.png",
            date: "2024-06-25",
            time: "16:50",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/008.png",
            name: "008.png",
            date: "2024-09-18",
            time: "10:05",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/009.png",
            name: "009.png",
            date: "2024-11-11",
            time: "12:30",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/010.png",
            name: "010.png",
            date: "2024-04-22",
            time: "07:55",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/011.png",
            name: "011.png",
            date: "2024-02-28",
            time: "19:15",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/012.png",
            name: "012.png",
            date: "2024-03-10",
            time: "17:05",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/013.png",
            name: "013.png",
            date: "2024-07-16",
            time: "22:30",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/014.png",
            name: "014.png",
            date: "2024-08-03",
            time: "15:45",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/015.png",
            name: "015.png",
            date: "2024-10-01",
            time: "11:00",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/016.png",
            name: "016.png",
            date: "2024-12-05",
            time: "09:20",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/017.png",
            name: "017.png",
            date: "2024-06-12",
            time: "20:10",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/018.png",
            name: "018.png",
            date: "2024-05-18",
            time: "13:40",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/019.png",
            name: "019.png",
            date: "2024-09-24",
            time: "16:25",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/020.png",
            name: "020.png",
            date: "2024-01-30",
            time: "07:15",
            imgType: "Not Analyzed",
          },
          {
            url: "/images/021.png",
            name: "021.png",
            date: "2024-03-14",
            time: "18:50",
            imgType: "Not Analyzed",
          },
        ],
      },
      {
        collectionName: "Analyzed",
        images: [
          {
            url: "/images/downsample_001.png",
            name: "downsample_001.png",
            date: "2024-11-11",
            time: "12:30",
            imgType: "downsample",
          },
          {
            url: "/images/heatmap_001.png",
            name: "heatmap_001.png",
            date: "2024-12-05",
            time: "09:20",
            imgType: "heatmap",
          },
          {
            url: "/images/orthomosiac_001.png",
            name: "orthomosiac_001.png",
            date: "2024-03-14",
            time: "18:50",
            imgType: "orthomosiac",
          },
        ],
      },
    ];

    return ImageCollection.insertMany(collections);
  })
  .then(() => {
    console.log("Image collections seeded successfully!");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error seeding image collections:", error);
    mongoose.connection.close();
  });
