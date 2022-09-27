import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [img, setImg] = useState();
  const imgRef = useRef();
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onImgClick = () => {
    if (isLoading) return;

    imgRef?.current?.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file == null) return;

    setImg(file);
    setResult(null);
  };

  const onProcessHandler = async () => {
    if (isLoading || !img) return;

    console.log("Process");

    setIsLoading(true);

    fetch("https://localhost:8000/predict")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResult(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
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
              opacity: !isLoading ? 1 : 0.9,
              cursor: !isLoading ? "pointer" : "not-allowed",
            }}
          >
            SELECT IMAGE
          </button>

          <button
            onClick={img && !isLoading ? onProcessHandler : null}
            disabled={(img && !isLoading) == null}
            style={{
              color: "white",
              background: "#3f51b5",
              padding: "0.75rem",
              fontWeight: "bold",
              border: "none",
              margin: "1rem",
              opacity: img && !isLoading ? 1 : 0.9,
              cursor: img && !isLoading ? "pointer" : "not-allowed",
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
