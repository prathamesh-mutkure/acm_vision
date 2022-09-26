import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [img, setImg] = useState();
  const imgRef = useRef();
  const [result, setResult] = useState("");

  const onImgClick = () => {
    imgRef?.current?.click();
  };

  const handleImageChange = (event) => {
    setImg(event.target.files[0]);
  };

  const onProcessHandler = () => {
    console.log("Process");

    setResult("Result Here...");
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          ref={imgRef}
          type="file"
          accept="image/*"
          name="img"
          id="img"
          style={{
            visibility: "hidden",
          }}
          onChange={handleImageChange}
        />

        <div>
          {img ? (
            <img
              src={URL.createObjectURL(img)}
              className="App-logo"
              alt="logo"
            />
          ) : (
            <p>Select Image</p>
          )}
        </div>

        <div>
          <button
            onClick={onImgClick}
            style={{
              color: "white",
              background: "#3f51b5",
              padding: "0.75rem",
              fontWeight: "bold",
              border: "none",
              margin: "1rem",
              cursor: "pointer",
            }}
          >
            SELECT IMAGE
          </button>

          <button
            onClick={img ? onProcessHandler : null}
            disabled={img == null}
            style={{
              color: "white",
              background: "#3f51b5",
              padding: "0.75rem",
              fontWeight: "bold",
              border: "none",
              margin: "1rem",
              opacity: img ? 1 : 0.9,
              cursor: img ? "pointer" : "not-allowed",
            }}
          >
            PROCESS
          </button>
        </div>

        <div>
          <p>{result}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
