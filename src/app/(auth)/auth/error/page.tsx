'use client';

import { useSearchParams } from 'next/navigation';
import { Container, Title, Text, Button, Stack } from '@mantine/core';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <Container size="sm" mt="xl">
      <Title order={1} mb="md">Error</Title>
      <Stack gap="md">
        <Text c="red">{error || 'An unexpected error occurred'}</Text>
        <Button component="a" href="/login" color="blue">
          Go to Login
        </Button>
      </Stack>
    </Container>
  );
}