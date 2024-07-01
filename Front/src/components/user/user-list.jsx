import {
  Badge,
  Card,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";

import { ROLES } from "@/constants";
import { AuthContext } from "@/context/auth";
import { getUsers } from "@/services/users";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export const UsersList = () => {
  const [, setLocation] = useLocation();

  const {
    state: { user },
  } = useContext(AuthContext);
  const { roles } = user;

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  if (isError) toast.error("Error getting users");

  return (
    <Card className="w-full max-w-xl m-auto">
      <Title>
        Users
        <Badge className="ml-2">{users?.length - 1}</Badge>
      </Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell className="text-center">Id</TableHeaderCell>
            <TableHeaderCell className="text-center">Name</TableHeaderCell>
            <TableHeaderCell className="text-center">Username</TableHeaderCell>
            {roles.includes(ROLES.ADMIN || ROLES.MOD) && (
              <TableHeaderCell className="text-center">Actions</TableHeaderCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            !users?.length && (
              <TableRow>
                <TableCell colSpan="4" className="text-center">
                  No users
                </TableCell>
              </TableRow>
            )
          )}
          {users
            ?.filter((u) => u?.id != user.id)
            .map((user) => (
              <TableRow key={user.id}>
                <TableCell className="text-center">{user.id}</TableCell>
                <TableCell className="text-center">{user.name}</TableCell>
                <TableCell className="text-center">{user.userName}</TableCell>
                {roles.includes(ROLES.ADMIN || ROLES.MOD) && (
                  <TableCell className="text-center">
                    <button
                      className="mr-1 hover:cursor-pointer hover:opacity-75"
                      onClick={() => setLocation(`/users/${user.id}`)}
                    >
                      <Icon
                        icon={PencilSquareIcon}
                        color="blue"
                        title="Update"
                        tooltip={`Update ${user.name}`}
                      />
                    </button>
                    {roles.includes(ROLES.ADMIN) && (
                      <button className="hover:cursor-pointer hover:opacity-75">
                        <Icon
                          icon={TrashIcon}
                          color="red"
                          title="Delete"
                          tooltip={`Delete ${user.name}`}
                        />
                      </button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
};
