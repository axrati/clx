import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import React from "react";
const { ipcRenderer } = window.require("electron");
import { Template, TotalStorage } from "../types";
import "./TemplateList.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Button } from "@mui/material";
import CopySnackbar from "./CopySnackbar"; // Adjust path as needed
import IconButton from "@mui/material/IconButton";

type TemplateItemProps = {
  template: Template;
  setTemplates: Dispatch<SetStateAction<Template[]>>;
  searchTerm: string;
  setId: Dispatch<SetStateAction<string>>;
  setRoute: Dispatch<SetStateAction<"list" | "view">>;
  action: "COPY" | "EDIT" | "DELETE" | "EXPAND";
};

function TemplateItem({
  template,
  setTemplates,
  searchTerm,
  setId,
  setRoute,
  action,
}: TemplateItemProps) {
  const iconStyle = {};
  const [overflow, setOverflow] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Wrap your copy handler to trigger the snackbar
  const handleCopyWithAlert = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setSnackbarOpen(true);
  };

  const handleDelete = async (id: string) => {
    const deleted: Template[] = await ipcRenderer.invoke(
      "config:deleteTemplate",
      id
    );
    const results: Template[] = await ipcRenderer.invoke(
      "config:searchTemplates",
      searchTerm
    );
    setTemplates(results);
  };

  const handleEdit = async () => {
    setId(template.id);
    setRoute("view");
  };

  const handleCopy = async (val: string) => {
    navigator.clipboard.writeText(val);
    setSnackbarOpen(true);
  };

  return (
    <div className="template-row-frame" key={template.id}>
      <CopySnackbar open={snackbarOpen} onClose={handleSnackbarClose} />
      <div className="template-row-header">
        <p className="template-title">{template.title}</p>
        <div className="template-action-buttons">
          <Button
            sx={{ paddingLeft: "15px", paddingRight: "15px" }}
            color="error"
            startIcon={<DeleteIcon />}
            tabIndex={action == "DELETE" ? 0 : -1} // removed from tab order
            onClick={() => {
              handleDelete(template.id).then(() => {
                console.log("success");
              });
            }}
          >
            DELETE
          </Button>
          <Button
            sx={{ paddingLeft: "15px", paddingRight: "15px" }}
            color="warning"
            startIcon={<EditIcon />}
            tabIndex={action == "EDIT" ? 0 : -1} // removed from tab order
            onClick={() => {
              handleEdit().then(() => {
                console.log("success");
              });
            }}
          >
            EDIT
          </Button>
          <Button
            sx={{ paddingLeft: "15px", paddingRight: "15px" }}
            tabIndex={action == "COPY" ? 0 : -1} // remains focusable by tabbing
            color="warning"
            startIcon={<FileCopyIcon />}
            onClick={() => {
              handleCopy(template.value).then(() => {
                console.log("success");
              });
            }}
          >
            COPY
          </Button>
        </div>
      </div>
      <p className="template-desc">{template.description}</p>
      <p className="template-val">
        {overflow ? template.value : template.value.substring(0, 80)}
        {template.value.length > 80 ? "..." : ""}
        {"\n\n"}
        <span
          className="expander-class"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOverflow(!overflow);
          }}
        >
          {template.value.length > 80 && (
            <>
              {overflow ? (
                <></>
              ) : (
                <IconButton
                  tabIndex={action == "EXPAND" ? 0 : -1} // removed from tab order
                  onClick={() => {
                    setOverflow(!overflow);
                  }}
                >
                  <ExpandMoreIcon
                    sx={{
                      fontSize: "32px",
                      height: "30px",
                      width: "30px",
                      position: "relative",
                      // top: "-6px",
                      // left: "710px",
                    }}
                    className="expander-class"
                    color="success"
                  />
                </IconButton>
              )}
            </>
          )}
        </span>
      </p>
      {template.value.length > 80 && (
        <>
          {overflow ? (
            <IconButton
              tabIndex={action == "EXPAND" ? 0 : -1} // removed from tab order
              onClick={() => {
                setOverflow(!overflow);
              }}
            >
              <ExpandLessIcon
                sx={{
                  fontSize: "32px",
                  height: "30px",
                  width: "30px",
                  position: "relative",
                  // top: "-6px",
                  // left: "732px",
                }}
                className="expander-class"
                color="success"
              />
            </IconButton>
          ) : (
            <></>
          )}
        </>
      )}
      {template.value.length < 80 && (
        <>
          <IconButton
            tabIndex={action == "EXPAND" ? 0 : -1} // removed from tab order
            onClick={() => {
              console.log("next");
            }}
          ></IconButton>
        </>
      )}
    </div>
  );
}

type TemplateListProps = {
  templates: Template[];
  setTemplates: Dispatch<SetStateAction<Template[]>>;
  searchTerm: string;
  setId: Dispatch<SetStateAction<string>>;
  setRoute: Dispatch<SetStateAction<"list" | "view">>;
  action: "COPY" | "EDIT" | "DELETE" | "EXPAND";
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescrition: Dispatch<SetStateAction<string>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

function TemplateList({
  templates,
  setTemplates,
  searchTerm,
  setId,
  setRoute,
  action,
  title,
  setTitle,
  description,
  setDescrition,
  value,
  setValue,
}: TemplateListProps) {
  const scrollDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.ctrlKey && event.shiftKey) {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          scrollDivRef.current?.scrollBy({ top: -350, behavior: "smooth" });
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          scrollDivRef.current?.scrollBy({ top: 350, behavior: "smooth" });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      style={{ maxHeight: window.screen.height - 345 }}
      className="template-list-frame"
      ref={scrollDivRef}
    >
      {templates.map((t) => {
        return (
          <TemplateItem
            searchTerm={searchTerm}
            template={t}
            setTemplates={setTemplates}
            setId={setId}
            setRoute={setRoute}
            action={action}
          />
        );
      })}
    </div>
  );
}

export default TemplateList;
