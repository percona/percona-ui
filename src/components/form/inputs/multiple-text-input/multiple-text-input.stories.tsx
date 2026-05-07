import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import MultipleTextInput from './multiple-text-input';

type CustomArgs = {
  fieldName: string;
};

const meta = {
  title: 'Inputs/MultipleTextInput',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    fieldName: { type: 'string' },
  },
  render: function Render({ fieldName }) {
    const methods = useForm({
      defaultValues: { [fieldName]: [{ key: '', value: '' }] },
    });

    return (
      <FormProvider {...methods}>
        <MultipleTextInput fieldName={fieldName} />
      </FormProvider>
    );
  },
} satisfies Meta<CustomArgs>;

export default meta;
type Story = StoryObj<CustomArgs>;

export const Basic: Story = {
  args: {
    fieldName: 'labels',
  },
};
