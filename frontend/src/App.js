import React, { useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import axios from "axios";

const App = () => {
  const [previewImageUrl, setPreviewImageUrl] = useState(false);
  const [imagePrediction, setImagePrediction] = useState("");
  const [imageFile, setImageFile] = useState();
  // Function for previewing the chosen image

  const generatePreviewImageUrl = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => callback(reader.result);
  };

  // Event handler when image is chosen
  const handleChange = (event) => {
    const file = event.target.files[0];

    // If the image upload is cancelled
    if (!file) {
      return;
    }

    setImageFile(file);
    generatePreviewImageUrl(file, (previewImageUrl) => {
      setPreviewImageUrl(previewImageUrl);
      setImagePrediction("");
    });
  };

  // Function for sending image to the backend
  const uploadHandler = (e) => {
    const formData = new FormData();
    formData.append("file", imageFile, "img.png");
    var t0 = performance.now();
    // get current url and append /upload
    const currentUrl = window.location.origin;
    const endpoint = `${currentUrl}/upload`;
    axios
      .post(endpoint, formData)
      .then((response) => {
        const data = response.data;
        setImagePrediction(data);
        var t1 = performance.now();
        console.log(
          "The time it took to predict the image " +
            (t1 - t0) +
            " milliseconds."
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h1 className="App-title">Waste Image Classification App</h1>

      <div className="App-upload">
        <p>Upload an image for classification</p>

        {/* Field for previewing the chosen image */}
        <div className="image">
          {previewImageUrl && <img height={400} alt="" src={previewImageUrl} />}
        </div>

        {/* Button for choosing an image */}
        <div>
          <input type="file" name="file" onChange={handleChange} />
        </div>

        {/* Button for sending image to backend */}
        <div>
          <input type="submit" onClick={uploadHandler} />
        </div>

        {/* Text for model prediction */}

        {imagePrediction && (
          <div className="Prediction-area">
            <p>
              The model predicted that this image is of the waste image
              category: {imagePrediction}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
