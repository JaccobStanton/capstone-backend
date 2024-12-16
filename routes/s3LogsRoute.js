const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// API Route to Fetch Images from S3
router.get("/logs", async (req, res) => {
  try {
    const bucketName = process.env.S3_BUCKET_DRONE_LOGS;

    // Fetch list of images from S3
    const params = { Bucket: bucketName };
    const s3Response = await s3.listObjectsV2(params).promise();

    // Generate signed URLs and random metadata
    const images = s3Response.Contents.map((file) => {
      const url = s3.getSignedUrl("getObject", {
        Bucket: bucketName,
        Key: file.Key,
        Expires: 3600, // URL expiration time (in seconds)
      });

      const randomDate = new Date(
        2024,
        Math.floor(Math.random() * 12), // Random month
        Math.floor(Math.random() * 28) + 1 // Random day
      );
      const randomTime = `${Math.floor(Math.random() * 24)
        .toString()
        .padStart(2, "0")}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}`;

      return {
        name: file.Key,
        url,
        date: randomDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
        time: randomTime, // Random time
        imgType: file.Key.split(".").pop(), // Extract file extension
      };
    });

    res.json(images);
  } catch (error) {
    console.error("Error fetching images from S3:", error.message);
    res.status(500).json({ error: "Failed to fetch images from S3" });
  }
});

module.exports = router;
