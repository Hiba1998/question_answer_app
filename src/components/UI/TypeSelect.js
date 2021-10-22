import { MenuItem,InputLabel,Select } from '@mui/material';
import React from 'react';

export default function TypeSelect(props) {
  return (
    <>
        <InputLabel>{props.text}</InputLabel>
            <Select  size ="small" fullWidth  defaultValue="" inputRef={props.typeInputRef ? props.typeInputRef : null}  onChange={props.onChange} error={props.validationError ? props.validationError :false} >
                {props.types.map(type =>(
                    <MenuItem key={type.id} value={type.type}>{type.type}</MenuItem>
                ))}
            </Select>
    </>
  );
}
