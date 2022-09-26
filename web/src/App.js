import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [img, setImg] = useState();
  const imgRef = useRef();

  const onProcessHandler = () => {
    console.log("Process");
  };

  const onImgClick = () => {
    imgRef?.current?.click();

    setImg(imgRef?.current?.value);
    console.log(imgRef?.current?.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          ref={imgRef}
          type="file"
          accept="image/png image/jpeg"
          alt="Select Image"
          name="img"
          id="img"
          // value={img}
          style={{
            visibility: "hidden",
          }}
        />

        <div>
          {img ? (
            <img src={img} className="App-logo" alt="logo" />
          ) : (
            <p>Select Image</p>
          )}
        </div>

        <div>
          <button
            onClick={onImgClick}
            style={{
              color: "white",
              background: "#62DAFB",
              padding: "0.75rem",
              fontWeight: "bold",
              border: "none",
              margin: "1rem",
            }}
          >
            SELECT IMAGE
          </button>

          <button
            onClick={onProcessHandler}
            style={{
              color: "white",
              background: "#62DAFB",
              padding: "0.75rem",
              fontWeight: "bold",
              border: "none",
              margin: "1rem",
            }}
          >
            PROCESS
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
