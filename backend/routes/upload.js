const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const sharp = require("sharp");
const { getFaceDescriptor } = require("../faceService");
const faceapi = require("face-api.js");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

function extractDetails(text) {

  const aadhaar =
    text.match(/\d{4}\s\d{4}\s\d{4}/);

  const dob =
  text.match(
    /\d{2}[\/\-\.]\d{2}[\/\-\.]\d{4}/
  );

  let gender = "";

const lowerText = text.toLowerCase();

if (
  lowerText.includes("male") ||
  lowerText.includes("m ")
) {
  gender = "Male";
}

if (
  lowerText.includes("female") ||
  lowerText.includes("f ")
) {
  gender = "Female";
}

  return {
  aadhaarNumber: aadhaar ? aadhaar[0] : "Not Found",
  dob: dob ? dob[0] : "Not Found",
  gender: gender || "Not Found",
};
}

router.post(
  "/",
  upload.fields([
    { name: "aadhaar", maxCount: 1 },
    { name: "selfie", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const aadhaarPath = req.files.aadhaar[0].path;
      const selfiePath = req.files.selfie[0].path;

      const processedPath =
  "uploads/processed.png";

await sharp(aadhaarPath)
  .resize({ width: 1500 })
  .grayscale()
  .normalize()
  .sharpen()
  .toFile(processedPath);

const result =
  await Tesseract.recognize(
  processedPath,
  "eng",
  {
    logger: m => console.log(m)
  }
);

      console.log(result.data.text);

      const details =extractDetails(result.data.text);
      const aadhaarFace =
  await getFaceDescriptor(aadhaarPath);

console.log("Aadhaar Face:", !!aadhaarFace);

const selfieFace =
  await getFaceDescriptor(selfiePath);

console.log("Selfie Face:", !!selfieFace);

let faceMatch = false;
let distance = null;

if (aadhaarFace && selfieFace) {
  distance = faceapi.euclideanDistance(
    aadhaarFace.descriptor,
    selfieFace.descriptor
  );
  console.log("Distance:", distance);
  faceMatch = distance < 0.7;
}

res.json({
  success: true,
  details,
  faceMatch,
  distance: distance?.toFixed(4),
});

    } catch (error) {
      console.log(error);
      console.error(error);

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

module.exports = router;
