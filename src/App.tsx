import { useState } from "react";
import AuthButton from "./components/authentication/AuthButton";
import "./App.css";
import Editor from "./components/dashboard/chat/Editor";

function App() {
  return (
    <>
      {" "}
      <div>
        <h1>hello</h1>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <AuthButton isSubmitting={true} text="hell" />
        <Editor />
      </div>
    </>
  );
}

export default App;
