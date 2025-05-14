'use server';

import { db } from '@/config/db';
import { users } from '@/schema/user';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { Container, Title, Group } from '@mantine/core';
import { authOptions } from '@/app/api/auth/[...nextauth]/utils/authOptions';
import Link from 'next/link';
import UserTable from './UserTable';

async function getUsers() {
  return db.select().from(users);
}

export default async function UsersListPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  const allowedRoles = ['regular_admin', 'super_admin'];
  if (!allowedRoles.includes(session.user.role)) {
    redirect('/auth/error?error=AccessDenied');
  }

  const userList = await getUsers();

  return (
    <Container size="lg" mt="xl">
      <Title order={1} mb="md">Users List</Title>
     <UserTable users={userList} />
      <Group mt="md">
        <Link  href="/dashboard" color="blue">
          Back to Dashboard
        </Link>
      </Group>
    </Container>
  );
}