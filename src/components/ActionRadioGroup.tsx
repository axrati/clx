import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./ActionRadioGroup.css";
import { useEffect, useState, useRef } from "react";

type ActionType = "COPY" | "EDIT" | "DELETE" | "EXPAND" | "EXEC";

interface Props {
  state: ActionType;
  setState: React.Dispatch<React.SetStateAction<ActionType>>;
}

const ActionRadioGroup: React.FC<Props> = ({ state, setState }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "Tab") {
        event.preventDefault();
        ref.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <FormControl
      component="fieldset"
      sx={{
        height: "30px",
        width: "200px",
        position: "absolute",
        left: "375px",
        top: "217px",
      }}
    >
      {/* <p className="active-radio-group-info">Tab key index</p> */}
      <RadioGroup
        row
        aria-labelledby="action-radio-group-label"
        name="action-radio-buttons-group"
        value={state}
        onChange={(e) => setState(e.target.value as ActionType)}
      >
        <div style={{ display: "flex" }}>
          <FormControlLabel
            value="EXPAND"
            control={<Radio size="small" color="success" />}
            inputRef={state === "EXPAND" ? ref : null}
            label="Expand"
          />
          <FormControlLabel
            value="DELETE"
            control={<Radio size="small" color="success" />}
            inputRef={state === "DELETE" ? ref : null}
            label="Delete"
          />
          <FormControlLabel
            value="EXEC"
            inputRef={state === "EXEC" ? ref : null}
            control={<Radio size="small" color="success" />}
            label="Execute"
          />
          <FormControlLabel
            value="EDIT"
            inputRef={state === "EDIT" ? ref : null}
            control={<Radio size="small" color="success" />}
            label="Edit"
          />
          <FormControlLabel
            value="COPY"
            inputRef={state === "COPY" ? ref : null}
            control={<Radio size="small" color="success" />}
            label="Copy"
          />
        </div>
      </RadioGroup>
    </FormControl>
  );
};

export default ActionRadioGroup;
