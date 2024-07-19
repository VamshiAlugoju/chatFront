import { ThemeProvider } from "./contexts/ThemeContext";
import AuthButton from "./components/authentication/AuthButton";
import "./App.css";
import Editor from "./components/dashboard/chat/Editor";
import { useState } from "react";
import ConfirmationModal from "./components/ConfirmationModal";
import Message from "./components/dashboard/chat/Message";
import QuillReader from "./components/dashboard/quill/QuillReader"
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [open, setOpen] = useState(true);
  function dummy() {}
  const [editMessage, setEditMessage] = useState("");
  return (
    <>
      <ThemeProvider>
        {" "}
        <div>
          <h1>{open ? "true " : "false"}</h1>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
          <AuthButton isSubmitting={false} text="hell" />
          <Editor />
          <Message
            editMessage="vamshi"
            index={1}
            message="hello"
            previousMessageDate="hel"
            previousSameSender={false}
            setEditMessage={setEditMessage}
          >
            {" "}
            {/* hello{" "} */}
          </Message>
          <Message
            editMessage="vamshi"
            index={1}
            message={{text : "vamshi"}}
            previousMessageDate="hel"
            previousSameSender={false}
            setEditMessage={setEditMessage}
          >
            {" "}
            {/* hello{" "} */}
          </Message>
          {/* <CancelButton  key={1} setOpen={setOpen} /> */}
          <ConfirmationModal
            open={open}
            text="hello"
            title="ransengan"
            setOpen={setOpen}
            onConfirm={dummy}
          />
          <QuillReader text="vamshi" key={1} isEdited={true} />
          <LoadingScreen />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
