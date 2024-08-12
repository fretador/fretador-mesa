import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../../store/slices/exampleSlice";

const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.example.value);

  console.log("Counter Component Rendered"); // Adicione este log para verificar
  console.log("Current Count:", count); // Adicione este log para verificar o estado

  return (
    <div style={{ backgroundColor: "red" }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
    </div>
  );
};

export default Counter;
