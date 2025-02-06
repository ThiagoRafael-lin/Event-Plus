import React, { useEffect, useState } from "react";

const TestPage = () => {
  const [count, setCount] = useState(0);
//   const [calculation, setCalculation] = useState(10);

  useEffect(() => {
    document.title = count * 2; 
  }, [count] );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      {/* <p>Calculation: {calculation}</p> */}
    </div>
  );
};

export default TestPage;
