import { Dispatch, SetStateAction, useRef, useState } from "react";
import "./App.css";

const TIMEOUT = 1000;

const SLIDES = [
  "https://picsum.photos/id/10/300/100",
  "https://picsum.photos/id/20/300/100",
  "https://picsum.photos/id/30/300/100",
];

function Controls({
  setSlideNumber,
}: {
  setSlideNumber: Dispatch<SetStateAction<number>>;
}) {
  const intervalRef = useRef<number | null>(null);

  function showNextImage() {
    setSlideNumber((n: number) => {
      const next = n + 1;
      return next > SLIDES.length - 1 ? 0 : next;
    });
  }

  return (
    <div>
      <button
        onClick={() => {
          setSlideNumber((n: number) => {
            const prev = n - 1;
            return prev < 0 ? SLIDES.length - 1 : prev;
          });
        }}
      >
        Prev
      </button>
      <button onClick={showNextImage}>Next</button>
      <button
        onClick={() => {
          if (!intervalRef.current) {
            intervalRef.current = setInterval(showNextImage, TIMEOUT);
          }
        }}
      >
        Play
      </button>
      <button
        onClick={() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }}
      >
        Stop
      </button>
    </div>
  );
}

function Slide({ slideNumber }: { slideNumber: number }) {
  return <img src={SLIDES[slideNumber]} />;
}

function App() {
  const [slideNumber, setSlideNumber] = useState(0);

  return (
    <>
      <Slide slideNumber={slideNumber} />
      <Controls setSlideNumber={setSlideNumber} />
    </>
  );
}

export default App;
