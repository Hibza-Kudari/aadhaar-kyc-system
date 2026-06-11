# Aadhaar OCR & Face Verification System

A full-stack KYC verification system that extracts Aadhaar details using OCR and verifies user identity through facial recognition.

## Features

- Upload Aadhaar card image
- Upload selfie image
- Extract Aadhaar Number, DOB, and Gender using OCR
- Detect faces from Aadhaar card and selfie
- Compare facial embeddings using Face-api.js
- Calculate similarity score
- Verify KYC automatically

## Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- Multer
- Tesseract.js
- Sharp
- Face-api.js
- TensorFlow.js

## Project Structure

```
aadhaar-kyc-system
│
├── backend
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── faceService.js
│   └── server.js
│
├── frontend
│   ├── src
│   └── public
│
└── README.md
```

## Installation

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Usage

1. Upload Aadhaar card image
2. Upload selfie image
3. Click Verify KYC
4. View extracted Aadhaar details and face verification result

## Sample Output

- Aadhaar Number
- Date of Birth
- Gender
- Face Match Status
- Similarity Score

## Future Improvements

- Aadhaar QR code extraction
- MongoDB integration
- PDF verification reports
- Admin dashboard
- Face match percentage visualization

## System Architecture

```text
+------------------+
| React Frontend   |
| (File Upload UI) |
+--------+---------+
         |
         | HTTP POST
         v
+------------------+
| Express Backend  |
+--------+---------+
         |
         +-------------------+
         |                   |
         v                   v
+---------------+   +----------------+
| Tesseract OCR |   | Face-api.js    |
| Extract Data  |   | Face Matching  |
+-------+-------+   +--------+-------+
        |                    |
        v                    v
+-------------------------------+
| Aadhaar Details + Face Result |
+---------------+---------------+
                |
                v
         JSON Response
                |
                v
         React Frontend
```

## Author

Hibza Mohammad Ali Kudari