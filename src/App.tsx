import React, { useState, useEffect } from "react";
//@ts-ignore This exists...
import logo from "./imgs/logo2.png";
import "./App.css";
import List from "./pages/List";
import { Button } from "@mui/material";
import { Template } from "./types";
import New from "./pages/New";
import ActionRadioGroup from "./components/ActionRadioGroup";

const { ipcRenderer } = window.require("electron");

const App: React.FC = () => {
  const [route, setRoute] = useState<"list" | "view">("list");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [id, setId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [action, setAction] = useState<
    "COPY" | "EDIT" | "DELETE" | "EXPAND" | "EXEC"
  >("COPY");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState("");

  const exportTempltes = async () => {
    setRoute("list");
    const results = await ipcRenderer.invoke("config:export", searchTerm);
    console.log(results);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if Control key is held down
      if (event.ctrlKey) {
        // For "Control+N"
        if (event.key.toLowerCase() === "n") {
          event.preventDefault();
          setId("");
          setTitle("");
          setDesc("");
          setValue("");
          setRoute("view");
        }
        // For "Control+S"
        if (event.key.toLowerCase() === "s") {
          setRoute("list");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="frame">
      <div style={{ display: "flex" }}>
        <div
          className="title-frame"
          onClick={() => {
            setRoute("list");
          }}
        >
          <img className="logo" src={logo} />
          <p className="title">clx</p>
        </div>
        <div className="title-tips">
          <p style={{ position: "relative", left: "-45px" }}>
            CTL + \{" "}
            <span style={{ marginLeft: "115px", marginRight: "10px" }}>==</span>{" "}
            hide/show
          </p>
          <p style={{ position: "relative", top: "-12px", left: "-45px" }}>
            CTL + SHIFT + \{" "}
            <span style={{ marginLeft: "53px", marginRight: "10px" }}>==</span>{" "}
            move position
          </p>
          <p style={{ position: "relative", top: "-26px", left: "-45px" }}>
            CTL + SHIFT + <span className="emoji">▲-▼</span>{" "}
            <span style={{ marginLeft: "24px", marginRight: "10px" }}>==</span>{" "}
            scroll
          </p>
          <p style={{ position: "relative", top: "-43px", left: "-45px" }}>
            CTL + <span className="emoji">🅽</span>{" "}
            <span style={{ marginLeft: "108px", marginRight: "10px" }}>==</span>{" "}
            new
          </p>
          <p style={{ position: "relative", top: "-59px", left: "-45px" }}>
            CTL + <span className="emoji">🆂</span>{" "}
            <span style={{ marginLeft: "108px", marginRight: "10px" }}>==</span>{" "}
            focus search
          </p>
          <p style={{ position: "relative", top: "-70px", left: "-45px" }}>
            CTL + TAB
            <span style={{ marginLeft: "108px", marginRight: "10px" }}>
              ==
            </span>{" "}
            focus tab key
          </p>
        </div>
      </div>
      <ActionRadioGroup state={action} setState={setAction} />
      <div className="button-tray">
        <Button
          color="success"
          variant="outlined"
          onClick={() => {
            setId("");
            setTitle("");
            setDesc("");
            setValue("");
            setRoute("view");
          }}
          tabIndex={route == "view" && id == "" ? -1 : 1}
        >
          NEW
        </Button>
        <Button
          color="success"
          variant="outlined"
          disabled={route === "list"}
          onClick={() => {
            setRoute("list");
          }}
          tabIndex={route == "list" ? -1 : 1}
        >
          SEARCH
        </Button>
        <Button
          tabIndex={3}
          color="success"
          variant="outlined"
          onClick={exportTempltes}
          disabled={route === "view"}
        >
          EXPORT
        </Button>
      </div>

      {route === "list" ? (
        <List
          setId={setId}
          setRoute={setRoute}
          templates={templates}
          setTemplates={setTemplates}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          action={action}
          title={title}
          setTitle={setTitle}
          description={desc}
          setDescrition={setDesc}
          value={value}
          setValue={setValue}
        />
      ) : (
        <New
          searchTerm={searchTerm}
          setTemplates={setTemplates}
          id={id}
          setId={setId}
          setRoute={setRoute}
          title={title}
          setTitle={setTitle}
          description={desc}
          setDescrition={setDesc}
          value={value}
          setValue={setValue}
        />
      )}
    </div>
  );
};

export default App;
