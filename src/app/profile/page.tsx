'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { logout } from '@/app/(auth)/actions/logout';
import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      await signOut({ redirect: false });
      router.push('/');
    } else {
      console.error('Logout failed:', result.error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const { user } = session;

  return (
    <Container size="sm" mt="xl">
      <Title order={1} mb="md">User Profile</Title>
      <Stack gap="sm">
        <Text><strong>ID:</strong> {user.id}</Text>
        <Text><strong>Name:</strong> {user.name}</Text>
        <Text><strong>Email:</strong> {user.email}</Text>
        <Text><strong>Role:</strong> {user.role}</Text>
        <Text><strong>Phone:</strong> {user.phone || 'Not provided'}</Text>
      </Stack>
      <Group mt="md">
        <Button component="a" href="/dashboard" color="blue">
          Back to Dashboard
        </Button>
        <Button onClick={handleLogout} color="red">
          Logout
        </Button>
      </Group>
    </Container>
  );
}