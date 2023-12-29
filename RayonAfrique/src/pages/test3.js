import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import usePlacesAutocomplete from 'use-places-autocomplete';

export default function Test3() {
    const { setValue, suggestions : {data}}  = usePlacesAutocomplete({debounce:300});
    console.log(data);
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
      sx={{ width: 300 }}
      getOptionLabel={(option) => typeof option ==="string" ? option : option.description}
      filterOptions={(x)=> x}
      renderInput={(params) => <TextField {...params} label="Movie" />}
      onInputChange={(event, newValue) => setValue(newValue) }
    />
  );
}