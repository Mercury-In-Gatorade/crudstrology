
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
`;

const Label = styled.label`
  margin-bottom: 4px;
`;

const Input = styled.input`
  margin-bottom: 16px;
  padding: 8px;
  font-size: 16px;
  color: black;
`;

const Textarea = styled.textarea`
  margin-bottom: 16px;
  padding: 8px;
  font-size: 16px;
  color: black;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #1e88e5;
  color: #ffffff;
  border: none;
  cursor: pointer;
`;

const UserForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="hobbies">Hobbies</Label>
      <Input {...register('hobbies', { required: true })} id="hobbies" />

      <Label htmlFor="interests">Interests</Label>
      <Input {...register('interests', { required: true })} id="interests" />

      <Label htmlFor="profession">Profession</Label>
      <Input {...register('profession', { required: true })} id="profession" />

      <Label htmlFor="personalDetails">Personal Details</Label>
      <Textarea {...register('personalDetails', { required: true })} id="personalDetails" rows="4" />

      <Label htmlFor="relationshipStatus">Relationship Status</Label>
      <Input {...register('relationshipStatus', { required: true })} id="relationshipStatus" />

      <Label htmlFor="vices">Vices</Label>
      <Input {...register('vices', { required: true })} id="vices" />

      <Label htmlFor="virtues">Virtues</Label>
      <Input {...register('virtues', { required: true })} id="virtues" />

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default UserForm;
