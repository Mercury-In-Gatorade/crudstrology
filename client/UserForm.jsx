import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { UserContext } from './App.jsx';

const Container = styled.div`
display: flex;
justify-content: space-between;
max-width: 1200px
margin: 0 auto;
margin-bottom: 30px
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin-right: 16px;
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
const Story = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 16pc;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  font-size: 16px;
  color: black;
`;

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { sign } = useContext(UserContext);
  const [story, setStory] = useState('');

  const getPrediction = async (content) => {
    axios
      .get(`/api/openai?content=${content}`)
      .then((response) => {
        const reply = response.data.content;
        console.log(reply);
        setStory(reply);
      })
      .catch((err) => {
        console.error('failed to get fortune', err);
      });
  };

  const onSubmit = (data) => {
    //console.log(data);
    const { hobbies, interests, personalDetails, profession, vices, virtues } =
      data;

    const content = `tell an individual their near future. you should add random catastrophes, events etc that you know may occur in reality at any time over the next 200 years, results should be based personal information which should use to deduce other attributes that match similar personalities, you are an all knowing entity who can see into the future and you know the future is bad, use declarative statements only. these is the future you are telling this person directly. do not personalize
    the information, do not repeat back the information you have been told, do not make suggestions, moralize or give advice just tell them the future, ${JSON.stringify(
      data
    )} the users sign astrological sing is ${sign}`;
    console.log(content);
    //GET future prediction from openai
    getPrediction(content);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor='hobbies'>Hobbies</Label>
        <Input {...register('hobbies', { required: true })} id='hobbies' />

        <Label htmlFor='interests'>Interests</Label>
        <Input {...register('interests', { required: true })} id='interests' />

        <Label htmlFor='profession'>Profession</Label>
        <Input
          {...register('profession', { required: true })}
          id='profession'
        />

        <Label htmlFor='personalDetails'>Personal Details</Label>
        <Textarea
          {...register('personalDetails', { required: true })}
          id='personalDetails'
          rows='4'
        />

        <Label htmlFor='relationshipStatus'>Relationship Status</Label>
        <Input
          {...register('relationshipStatus', { required: true })}
          id='relationshipStatus'
        />

        <Label htmlFor='vices'>Vices</Label>
        <Input {...register('vices', { required: true })} id='vices' />

        <Label htmlFor='virtues'>Virtues</Label>
        <Input {...register('virtues', { required: true })} id='virtues' />

        <Button type='submit'>Submit</Button>
      </Form>
      <Story>{story}</Story>
    </Container>
  );
};

export default UserForm;
