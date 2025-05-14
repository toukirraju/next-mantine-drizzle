'use server';

import { db } from '@/config/db';
import { users } from '@/schema/user';
import { inArray } from 'drizzle-orm';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { Container, Title, Table, Group } from '@mantine/core';
import { authOptions } from '@/app/api/auth/[...nextauth]/utils/authOptions';
import Link from 'next/link';

async function getAdmins() {
  return db
    .select()
    .from(users)
    .where(inArray(users.role, ['regular_admin', 'super_admin']));
}

export default async function AdminsListPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  if (session.user.role !== 'super_admin') {
    redirect('/auth/error?error=AccessDenied');
  }

  const admins = await getAdmins();

  return (
    <Container size="lg" mt="xl">
      <Title order={1} mb="md">Admins List</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Phone</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {admins.map((admin) => (
            <Table.Tr key={admin.id}>
              <Table.Td>{admin.id}</Table.Td>
              <Table.Td>{admin.name}</Table.Td>
              <Table.Td>{admin.email}</Table.Td>
              <Table.Td>{admin.role}</Table.Td>
              <Table.Td>{admin.phone || 'N/A'}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Group mt="md">
        <Link  href="/dashboard" color="blue">
          Back to Dashboard
        </Link>
      </Group>
    </Container>
  );
}