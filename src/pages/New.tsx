import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import "./New.css";
import { TextField, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Template } from "../types";
const { ipcRenderer } = window.require("electron");
import { nid } from "../globals";

type NewProps = {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  setRoute: Dispatch<SetStateAction<"list" | "view">>;
  searchTerm: string;
  setTemplates: Dispatch<SetStateAction<Template[]>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescrition: Dispatch<SetStateAction<string>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

function New({
  id,
  setId,
  setRoute,
  title,
  setTitle,
  description,
  setDescrition,
  value,
  setValue,
}: NewProps) {
  const fetchTemplate = async (templateId: string) => {
    const result: Template | null = await ipcRenderer.invoke(
      "config:getTemplate",
      templateId
    );
    if (result) {
      setTitle(result.title);
      setDescrition(result.description);
      setValue(result.value);
      setId(result.id);
    } else {
      setTitle("");
      setDescrition("");
      setValue("");
      setId("");
    }
    // setTemplate(result);
  };

  const saveTemplate = async () => {
    if (id === "") {
      const newId = nid();
      const result: Template | null = await ipcRenderer.invoke(
        "config:addTemplate",
        { id: newId, title, description, value: value }
      );
      setRoute("list");
    } else {
      const result: Template | null = await ipcRenderer.invoke(
        "config:editTemplate",
        { id, title, description, value: value }
      );
      setRoute("list");
    }
  };

  useEffect(() => {
    if (id !== "") {
      fetchTemplate(id).then(() => {
        // console.log("Loaded");
      });
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex" }}>
          <div className="button-reserve"></div>

          <div
            className="new-frame"
            style={{ maxHeight: window.screen.height - 325 }}
          >
            <p className="new-tip">
              Title <span className="new-tip-sub">Name your content</span>{" "}
            </p>
            <TextField
              inputProps={{
                min: 0,
                style: {
                  // textAlign: "center",
                  height: "30px",
                  fontSize: "20px",
                  color: "var(--green)",
                  fontFamily: "monospace",
                },
              }}
              value={title}
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
              // fullWidth
              sx={{ width: "90vw", maxWidth: "1600px" }}
              color="success"
              variant="standard"
              autoFocus
            />
            <div className="new-spacer"></div>
            <p className="new-tip">
              Description{" "}
              <span className="new-tip-sub">
                List shortcuts for search or describe your content
              </span>{" "}
            </p>
            <TextField
              multiline
              inputProps={{
                min: 0,
                style: {
                  // textAlign: "center",
                  height: "30px",
                  marginTop: "15px",
                  fontSize: "14px",
                  color: "var(--green)",
                  fontFamily: "monospace",
                },
              }}
              value={description}
              onChange={(e: any) => {
                setDescrition(e.target.value);
              }}
              // fullWidth
              sx={{ width: "90vw", maxWidth: "1600px" }}
              color="success"
              variant="standard"
              maxRows={4}
            />
            <div className="new-spacer"></div>
            <p className="new-tip">
              Content <span className="new-tip-sub">The copy/paste value</span>{" "}
            </p>
            <TextField
              multiline
              inputProps={{
                min: 0,
                style: {
                  // textAlign: "center",
                  height: "30px",
                  marginTop: "15px",
                  fontSize: "14px",
                  color: "var(--green)",
                  fontFamily: "monospace",
                },
              }}
              value={value}
              onChange={(e: any) => {
                setValue(e.target.value);
              }}
              // fullWidth
              sx={{ width: "90vw", maxWidth: "1600px" }}
              color="success"
              variant="standard"
              maxRows={10}
            />
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <Button
                startIcon={<SaveIcon />}
                color="info"
                variant="contained"
                onClick={saveTemplate}
                disabled={
                  title.trim().length === 0 || value.trim().length === 0
                }
              >
                SAVE
              </Button>
            </div>
            {/* End with button for easy TAB */}
          </div>
        </div>
      </div>
    </>
  );
}

export default New;
