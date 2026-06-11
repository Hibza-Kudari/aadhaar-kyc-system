import { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [aadhaar, setAadhaar] = useState(null);
  const [selfie, setSelfie] = useState(null);

  const handleUpload = async () => {
    if (!aadhaar || !selfie) {
      alert("Please select both files");
      return;
    }

    const formData = new FormData();

    formData.append("aadhaar", aadhaar);
    formData.append("selfie", selfie);

    try {
  const response = await axios.post(
    "http://localhost:5000/upload",
    formData
  );

  console.log(response.data.details);

  alert(
  `KYC Verification Successful

Aadhaar Number: ${response.data.details.aadhaarNumber}
DOB: ${response.data.details.dob}
Gender: ${response.data.details.gender}

Face Match: ${
    response.data.faceMatch
      ? "Verified ✅"
      : "Not Verified ❌"
  }

Similarity Score: ${response.data.distance}`
);

} catch (error) {
  console.log(error);
  alert("Upload Failed");
}
    
  };

  return (
    <div>
      <h3>Upload Aadhaar Card</h3>

      <input
        type="file"
        onChange={(e) => setAadhaar(e.target.files[0])}
      />

      <br />
      <br />

      <h3>Upload Selfie</h3>

      <input
        type="file"
        onChange={(e) => setSelfie(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Verify KYC
      </button>
    </div>
  );
}

export default FileUpload;