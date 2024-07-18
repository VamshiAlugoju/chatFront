import { useState } from "react";
import AuthButton from "./components/authentication/AuthButton";
import {} from ""
import "./App.css";

function App() {
  console.log(process.cwd());
  return (
    <>
      <AuthButton text="vamshi" isSubmitting={true} />
    </>
  );
}

export default App;
