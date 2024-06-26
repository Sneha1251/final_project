import { useState } from "react";
import Routing from "./Routes/routes.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
