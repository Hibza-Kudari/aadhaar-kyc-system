const faceapi = require("face-api.js");
const canvas = require("canvas");
const path = require("path");

const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({
  Canvas,
  Image,
  ImageData,
});

async function loadModels() {
  const MODEL_PATH = path.join(__dirname, "models");

  await faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_PATH);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);

  console.log("Face Models Loaded");
}

async function getFaceDescriptor(imagePath) {
  const img = await canvas.loadImage(imagePath);

  const detection = await faceapi
  .detectSingleFace(
    img,
    new faceapi.TinyFaceDetectorOptions({
      inputSize: 608,
      scoreThreshold: 0.1,
    })
  )
  .withFaceLandmarks()
  .withFaceDescriptor();

console.log("Detection:", !!detection);

  return detection;
}

module.exports = {
  loadModels,
  getFaceDescriptor,
};