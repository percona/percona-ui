import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import SwitchInput from './switch';
import { SwitchInputProps } from './switch.types';

type CustomArgs = SwitchInputProps & { defaultChecked?: boolean };

const meta = {
  title: 'Inputs/SwitchInput',
  component: SwitchInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { type: 'string' },
    labelCaption: { type: 'string' },
    defaultChecked: { type: 'boolean' },
  },
  render: function Render({ name, label, labelCaption, switchFieldProps, defaultChecked }) {
    const methods = useForm({ defaultValues: { [name]: defaultChecked ?? false } });

    return (
      <FormProvider {...methods}>
        <SwitchInput
          name={name}
          label={label}
          labelCaption={labelCaption}
          switchFieldProps={switchFieldProps}
        />
      </FormProvider>
    );
  },
} satisfies Meta<CustomArgs>;

export default meta;
type Story = StoryObj<CustomArgs>;

export const Basic: Story = {
  args: {
    name: 'basic',
    label: 'Enable feature',
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    name: 'checked',
    label: 'Enable feature',
    defaultChecked: true,
  },
};

export const WithCaption: Story = {
  args: {
    name: 'withCaption',
    label: 'Enable feature',
    labelCaption: 'This will activate the feature globally',
    defaultChecked: false,
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled',
    label: 'Enable feature',
    switchFieldProps: { disabled: true },
    defaultChecked: false,
  },
};
