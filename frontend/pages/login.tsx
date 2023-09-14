import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';
  import { useForm } from '@mantine/form';

import React from 'react';

  export default function AuthenticationTitle() {
    const form = useForm({
        initialValues: { password: '', email: '' },

        // functions will be used to validate values at corresponding key
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: (value) => (value.length < 6 ? 'Passeord not valid' : null),
        },
      });

      const onSubmit = (values: {password: string, email: string}) => {
        console.log({values})

      }
    return (
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="you@gmail.com" required {...form.getInputProps('email')}/>
            <PasswordInput label="Password" placeholder="Your password" required mt="md"  {...form.getInputProps('password')} />
            <Group position="apart" mt="lg">
                <Checkbox label="Remember me" />
                <Anchor component="button" size="sm">
                Forgot password?
                </Anchor>
            </Group>
            <Button fullWidth mt="xl" type='submit'>
                Sign in
            </Button>
            </Paper>
        </form>


      </Container>
    );
  }