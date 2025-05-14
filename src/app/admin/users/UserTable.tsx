'use client'
import { User } from '@/schema/user'
import { Table } from '@mantine/core'

const UserTable = ({users}:{
    users:User[]
}) => {
  return (
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
          {users?.map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>{user.id}</Table.Td>
              <Table.Td>{user.name}</Table.Td>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td>{user.role}</Table.Td>
              <Table.Td>{user.phone || 'N/A'}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
  )
}

export default UserTable
