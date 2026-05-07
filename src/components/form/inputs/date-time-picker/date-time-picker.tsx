import { Controller, useFormContext } from "react-hook-form";

import { kebabize } from "@/utils";
import { DateTimePickerInputProps } from "./date-time-picker.types";
import { DateTimePicker, PickerValidDate } from "@mui/x-date-pickers";

const DateTimePickerInput = <T extends PickerValidDate>({
  name,
  control,
  controllerProps,
  ...dateTimePickerProps
}: DateTimePickerInputProps<T>) => {
  const formContext = useFormContext();
  const contextControl = formContext?.control;

  return (
    <Controller
      name={name}
      control={control ?? contextControl}
      render={({ field, fieldState: { error } }) => (
        <DateTimePicker
          {...field}
          inputRef={field.ref}
          slotProps={{
            textField: {
              ...({ "data-testid": `${kebabize(name)}-field` } as {}),
              error: !!error,
              helperText: error ? error.message : "",
              InputLabelProps: {
                ...({ "data-testid": `${kebabize(name)}-label` } as {}),
              },
              inputProps: {
                "data-testid": `${kebabize(name)}-input`,
              },
              FormHelperTextProps: {
                ...({ "data-testid": `${kebabize(name)}-message` } as {}),
              },
            },
          }}
          {...dateTimePickerProps}
        />
      )}
      {...controllerProps}
    />
  );
};

export default DateTimePickerInput;
