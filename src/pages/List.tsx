import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { TextField } from "@mui/material";
import TemplateList from "../components/TemplateList";
import "./List.css";
import { Template, TotalStorage } from "../types";
const { ipcRenderer } = window.require("electron");

type ListProps = {
  templates: Template[];
  setTemplates: Dispatch<SetStateAction<Template[]>>;
  setId: Dispatch<SetStateAction<string>>;
  setRoute: Dispatch<SetStateAction<"list" | "view">>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  action: "COPY" | "EDIT" | "DELETE" | "EXPAND" | "EXEC";
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescrition: Dispatch<SetStateAction<string>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

function List({
  templates,
  setTemplates,
  setId,
  setRoute,
  searchTerm,
  setSearchTerm,
  action,
}: ListProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleWindowFocus = () => {
      // When the window regains focus, ensure the input is focused.
      inputRef.current?.focus();
    };
    const handleDownFocus = (event: KeyboardEvent) => {
      // Check if Control key is held down
      if (event.ctrlKey) {
        // For "Control+S" in mid search to focus back to input bar
        if (event.key.toLowerCase() === "s") {
          inputRef.current?.focus();
        }
      }
    };

    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("keydown", handleDownFocus);
    return () => {
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("keydown", handleDownFocus);
    };
  }, []);

  const fetchTemplates = async () => {
    const results: Template[] = await ipcRenderer.invoke(
      "config:searchTemplates",
      searchTerm
    );
    // console.log(results);
    setTemplates(results);
  };

  // Call fetchTemplates whenever the search value changes.
  useEffect(() => {
    fetchTemplates();
  }, [searchTerm]);

  return (
    <div>
      <div>
        {searchTerm.length === 0 && (
          <p className="search-hover-text">Type to search</p>
        )}

        <TextField
          inputRef={inputRef}
          inputProps={{
            min: 0,
            style: {
              textAlign: "center",
              height: "50px",
              fontSize: "20px",
              marginTop: "10px",
              color: "var(--green)",
              fontFamily: "monospace",
            },
          }}
          value={searchTerm}
          onChange={(e: any) => {
            setSearchTerm(e.target.value);
          }}
          fullWidth
          color="success"
          variant="standard"
          autoFocus
        />
      </div>
      <TemplateList
        searchTerm={searchTerm}
        setTemplates={setTemplates}
        templates={templates}
        setRoute={setRoute}
        setId={setId}
        action={action}
      />
    </div>
  );
}

export default List;
