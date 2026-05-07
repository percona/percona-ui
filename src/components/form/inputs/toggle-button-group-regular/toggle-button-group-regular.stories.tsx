import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ToggleButtonGroupInputProps } from '../toggle-button-group';
import ToggleButtonGroupInputRegular from './toggle-button-group-regular';
import ToggleCard from '../../../buttons/toggle-card';

type CustomArgs = ToggleButtonGroupInputProps & {
  disabled?: boolean;
};

const meta = {
  title: 'Inputs/ToggleButtonGroupInputRegular',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { type: 'string' },
    disabled: { type: 'boolean' },
  },
  render: function Render({ label, disabled }) {
    const methods = useForm();

    return (
      <FormProvider {...methods}>
        <ToggleButtonGroupInputRegular
          name="toggle-button-group-regular"
          label={label}
          toggleButtonGroupProps={{ disabled }}
          controllerProps={{
            name: 'toggle-button-group-regular',
            defaultValue: 'small',
          }}
        >
          <ToggleCard value="small">Small</ToggleCard>
          <ToggleCard value="medium">Medium</ToggleCard>
          <ToggleCard value="large">Large</ToggleCard>
        </ToggleButtonGroupInputRegular>
      </FormProvider>
    );
  },
} satisfies Meta<CustomArgs>;

export default meta;
type Story = StoryObj<CustomArgs>;

export const Basic: Story = {
  args: {
    label: 'Resource size',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Resource size',
    disabled: true,
  },
};
