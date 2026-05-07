import {
  Autocomplete,
  CircularProgress,
  TextField,
  Tooltip,
} from "@mui/material";
import { kebabize } from "@/utils";
import { Controller, useFormContext } from "react-hook-form";
import { AutoCompleteInputProps } from "./auto-complete.types";

function AutoCompleteInput<T>({
  name,
  control,
  controllerProps,
  label,
  autoCompleteProps = {},
  textFieldProps = {},
  options,
  loading = false,
  isRequired = false,
  disabled = false,
  tooltipText,
  onChange,
}: AutoCompleteInputProps<T>) {
  const formContext = useFormContext();
  const contextControl = formContext?.control;

  const { helperText, ...restTextFieldProps } = textFieldProps;
  const { sx, ...restAutocompleteProps } = autoCompleteProps;

  return (
    <Controller
      name={name}
      control={control ?? contextControl}
      render={({ field, fieldState: { error } }) => (
        <Tooltip title={tooltipText} placement="top" arrow>
          <Autocomplete
            {...field}
            sx={{ mt: 3, ...sx }}
            options={options}
            forcePopupIcon
            disabled={disabled}
            onChange={(_, newValue) => {
              field.onChange(newValue);
              if (onChange) {
                onChange();
              }
            }}
            data-testid={`${kebabize(name)}-field`}
            // We might generalize this in the future, if we think renderInput should be defined from the outside
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!error}
                label={label}
                helperText={error ? error.message : helperText}
                InputLabelProps={{
                  ...params.InputLabelProps,
                  ...({ "data-testid": `${kebabize(name)}-label` } as {}),
                }}
                inputProps={{
                  "data-testid": `${kebabize(name)}-input`,
                  ...params.inputProps,
                  ...textFieldProps?.inputProps,
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                FormHelperTextProps={{
                  ...({ "data-testid": `${kebabize(name)}-message` } as {}),
                }}
                size="small"
                required={isRequired}
                {...restTextFieldProps}
              />
            )}
            {...restAutocompleteProps}
          />
        </Tooltip>
      )}
      {...controllerProps}
    />
  );
}

export default AutoCompleteInput;
