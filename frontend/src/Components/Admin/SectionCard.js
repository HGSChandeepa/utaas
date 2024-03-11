import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Checkbox,
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

  const handleAddDropdownField = () => {
    setDropdownFields([...dropdownFields, ""]);
  };

  const handleAddMultiSelectField = () => {
    setMultiSelectFields([...multiSelectFields, ""]);
  };

  const handleDropdownFieldChange = (index, value) => {
    const updatedFields = [...dropdownFields];
    updatedFields[index] = value;
    setDropdownFields(updatedFields);
    updateSectionData(index, {
      input,
      selectedOption,
      // dropdownData: updatedFields,
      // multiSelectData,
    });
  };

  const handleMultiSelectFieldChange = (index, value) => {
    const updatedFields = [...multiSelectFields];
    updatedFields[index] = value;
    setMultiSelectFields(updatedFields);
    updateSectionData(index, {
      input,
      selectedOption,
      // dropdownData,
      // multiSelectData: updatedFields,
    });
  };

  // const handleRemoveDropdownField = (index) => {
  //   const updatedFields = dropdownFields.filter((_, i) => i !== index);
  //   setDropdownFields(updatedFields);
  //   updateSectionData(index, {
  //     input,
  //     selectedOption,
  //     dropdownData: updatedFields,
  //     multiSelectData,
  //   });
  // };

  // const handleRemoveMultiSelectField = (index) => {
  //   const updatedFields = multiSelectFields.filter((_, i) => i !== index);
  //   setMultiSelectFields(updatedFields);
  //   updateSectionData(index, {
  //     input,
  //     selectedOption,
  //     dropdownData,
  //     multiSelectData: updatedFields,
  //   });
  // };

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
            {/* <MenuItem value="dropdown">
              <ArrowDropDownCircleIcon />
              <span className="px-2">Dropdown</span>
            </MenuItem>
            <MenuItem value="multiSelect">
              <ControlPointDuplicateIcon />
              <span className="px-2">Multiple Selects</span>
            </MenuItem> */}
          </Select>
        </FormControl>

        {/* {selectedOption === "dropdown" && (
          <div className="mt-3">
            {dropdownFields.map((field, index) => (
              <div key={index} className="flex items-center gap-2 my-2">
                <TextField
                  fullWidth
                  label={`Dropdown Option ${index + 1}`}
                  value={field}
                  onChange={(e) =>
                    handleDropdownFieldChange(index, e.target.value)
                  }
                />
                <IconButton
                  color="primary"
                  onClick={() => handleRemoveDropdownField(index)}
                >
                  <RemoveIcon className="bg-red-500 rounded-sm text-white hover:bg-red-600" />
                </IconButton>
              </div>
            ))}
            <IconButton color="primary" onClick={handleAddDropdownField}>
              <div className="flex items-center bg-slate-100 p-1 gap-1 rounded-sm justify-center hover:bg-slate-200">
                <p className="text-black text-base"> Add</p>
                <AddIcon className="bg-green-500 rounded-sm text-white" />
              </div>
            </IconButton>
          </div>
        )}
        {selectedOption === "multiSelect" && (
          <div className="mt-3 h-full m-5">
            {multiSelectFields.map((field, index) => (
              <div key={index} className="flex items-center gap-2 my-2">
                <Checkbox defaultChecked />
                <TextField
                  fullWidth
                  label={`Dropdown Option ${index + 1}`}
                  value={field}
                  variant="standard"
                  onChange={(e) =>
                    handleMultiSelectFieldChange(index, e.target.value)
                  }
                />
                <IconButton
                  color="primary"
                  onClick={() => handleRemoveMultiSelectField(index)}
                >
                  <RemoveIcon className="bg-red-500 rounded-sm text-white hover:bg-red-600" />
                </IconButton>
              </div>
            ))}
            <IconButton color="primary" onClick={handleAddMultiSelectField}>
              <div className="flex items-center bg-slate-100 p-1 gap-1 rounded-sm justify-center hover:bg-slate-200">
                <p className="text-black text-base"> Add</p>
                <AddIcon className="bg-green-500 rounded-sm text-white" />
              </div>
            </IconButton>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default SelectionCard;
