import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatTimestampToWIB } from "@/lib/utils";



interface tableProps {
  handleDelete: (id: string) => void;
  tenants: {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      image: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}

export function TableComponents({ handleDelete, tenants }: tableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tenant Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tenants.map((tenant) => (
          <TableRow key={tenant.id}>
            <TableCell className="font-medium">{tenant.name}</TableCell>
            <TableCell>{tenant.user?.name}</TableCell>
            <TableCell>{tenant.user?.email}</TableCell>
            <TableCell>{formatTimestampToWIB(tenant.createdAt)}</TableCell>
            <TableCell>
              <button
                onClick={() => handleDelete(tenant.id)}
                className="bg-red-500 text-white hover:bg-red-600 font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
