import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./ActionRadioGroup.css";

type ActionType = "COPY" | "EDIT" | "DELETE" | "EXPAND";

interface Props {
  state: ActionType;
  setState: React.Dispatch<React.SetStateAction<ActionType>>;
}

const ActionRadioGroup: React.FC<Props> = ({ state, setState }) => {
  return (
    <FormControl
      component="fieldset"
      sx={{
        height: "30px",
        width: "200px",
        position: "absolute",
        left: "505px",
        top: "130px",
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
            label="Expand"
          />
          <FormControlLabel
            value="COPY"
            control={<Radio size="small" color="success" />}
            label="Copy"
          />
          <FormControlLabel
            value="EDIT"
            control={<Radio size="small" color="success" />}
            label="Edit"
          />
          <FormControlLabel
            value="DELETE"
            control={<Radio size="small" color="success" />}
            label="Delete"
          />
        </div>
      </RadioGroup>
    </FormControl>
  );
};

export default ActionRadioGroup;
