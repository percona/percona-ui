import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import FileInput from './file';

type CustomArgs = {
  name: string;
  label: string;
  error?: boolean;
};

const meta = {
  title: 'Inputs/FileInput',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: { type: 'string' },
    label: { type: 'string' },
    error: { type: 'boolean' },
  },
  render: function Render({ name, label, error }) {
    const methods = useForm();
    if (error) {
      methods.setError(name, { message: 'File is required' });
    } else {
      methods.clearErrors(name);
    }

    return (
      <FormProvider {...methods}>
        <FileInput name={name} label={label} />
      </FormProvider>
    );
  },
} satisfies Meta<CustomArgs>;

export default meta;
type Story = StoryObj<CustomArgs>;

export const Basic: Story = {
  args: {
    name: 'file',
    label: 'Upload file',
    error: false,
  },
};

export const Error: Story = {
  args: {
    name: 'fileError',
    label: 'Upload file',
    error: true,
  },
};
