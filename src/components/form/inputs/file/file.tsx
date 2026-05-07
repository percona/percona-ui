import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { Upgrade as UpgradeIcon } from '@mui/icons-material';
import { kebabize } from '@/utils';
import { Control, Controller, useFormContext } from 'react-hook-form';

type FileInputProps = {
  name: string;
  label: string;
  control?: Control;
  textFieldProps?: TextFieldProps;
  fileInputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

const FileInput = ({
  name,
  label,
  textFieldProps = {},
  fileInputProps = {},
}: FileInputProps) => {
  const formContext = useFormContext();
  const contextControl = formContext?.control;

  return (
    <Controller
      name={name}
      control={control ?? contextControl}
      render={({ field, fieldState: { error } }) => (
        <TextField
          label={label}
          {...field}
          {...textFieldProps}
          value={
            field.value && field.value instanceof File ? field.value.name : ''
          }
          type="text"
          size="small"
          error={!!error}
          data-testid={`${kebabize(name)}-field`}
          InputLabelProps={{
            ...({ "data-testid": `${kebabize(name)}-label` } as {}),
          }}
          inputProps={{
            "data-testid": `${kebabize(name)}-input`,
          }}
          FormHelperTextProps={{
            ...({ "data-testid": `${kebabize(name)}-message` } as {}),
          }}
          InputProps={{
            endAdornment: (
              <IconButton component="label">
                <UpgradeIcon fontSize="medium" />
                <input
                  style={{ display: 'none' }}
                  type="file"
                  hidden
                  onChange={(event) => {
                    const { files } = event.target;

                    if (files) {
                      const file = files[0];
                      field.onChange(file);
                    }
                  }}
                  {...fileInputProps}
                />
              </IconButton>
            ),
          }}
          helperText={error ? error.message : textFieldProps?.helperText}
        />
      )}
    />
  );
};

export default FileInput;
