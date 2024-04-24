import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

function SelectionCard({ index, sectionData, updateSectionData }) {
  const { input, selectedOption, dropdownData, multiSelectData } = sectionData;

  const [dropdownFields, setDropdownFields] = useState(dropdownData);
  const [multiSelectFields, setMultiSelectFields] = useState(multiSelectData);

  const handleFieldChange = (event) => {
    const value = event.target.value;
    updateSectionData(index, {
      input: value,
      selectedOption,
      // dropdownData,
      // multiSelectData,
    });
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    updateSectionData(index, {
      input,
      selectedOption: value,
      // dropdownData,
      // multiSelectData,
    });
  };

  const renderSelectedOption = () => {
    switch (selectedOption) {
      case "number":
        return (
          <>
            <FormatListNumberedIcon />
            <span className="px-2">Number</span>
          </>
        );
      case "text":
        return (
          <>
            <FormatColorTextIcon />
            <span className="px-2">Text</span>
          </>
        );
      case "dropdown":
        return (
          <>
            <ArrowDropDownCircleIcon />
            <span className="px-2">Dropdown</span>
          </>
        );
      case "multiSelect":
        return (
          <>
            <ControlPointDuplicateIcon />
            <span className="px-2">Multiple Selects</span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row gap-4 w-full mx-20 justify-between bg-white p-5 rounded-md border-2 border-slate-400">
      <div className="w-full mb-3">
        <TextField
          fullWidth
          label="Enter the data"
          value={input}
          onChange={handleFieldChange}
        />
      </div>

      <div className="w-full">
        <FormControl fullWidth>
          <InputLabel id="data-type-label">Data Type</InputLabel>
          <Select
            labelId="data-type-label"
            id="data-type-select"
            value={selectedOption}
            label="Data Type"
            onChange={handleOptionChange}
            renderValue={() => renderSelectedOption()}
          >
            <MenuItem value="number">
              <FormatListNumberedIcon />
              <span className="px-2">Number</span>
            </MenuItem>
            <MenuItem value="text">
              <FormatColorTextIcon />
              <span className="px-2">Text</span>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default SelectionCard;
