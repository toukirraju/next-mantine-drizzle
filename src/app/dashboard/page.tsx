'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { logout } from '@/app/(auth)/actions/logout';
import { Button, Container, Text, Title, Stack } from '@mantine/core';

export default function DashboardPage() {
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
      <Title order={1} mb="md">Dashboard</Title>
      <Text>Welcome, {user.name} ({user.role})</Text>
      <Stack mt="md" gap="sm">
        <Button component="a" href="/profile" color="blue">
          View Profile
        </Button>
        {['regular_admin', 'super_admin'].includes(user.role) && (
          <Button component="a" href="/admin/users" color="blue">
            View Users List
          </Button>
        )}
        {user.role === 'super_admin' && (
          <Button component="a" href="/admin/admins" color="blue">
            View Admins List
          </Button>
        )}
        <Button component="a" href="/" color="gray">
          Home
        </Button>
        <Button onClick={handleLogout} color="red">
          Logout
        </Button>
      </Stack>
    </Container>
  );
}