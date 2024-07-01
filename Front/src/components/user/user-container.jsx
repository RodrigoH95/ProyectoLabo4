import {
  Button,
  Card,
  Flex,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Title,
} from "@tremor/react";

import { CreateUser } from "@/components/user/create-user";
import { UsersList } from "@/components/user/user-list";
import { ROLES } from "@/constants";
import { AuthContext } from "@/context/auth";
import {
  ArrowLeftIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useContext } from "react";
import { useLocation } from "wouter";

export const UserContainer = () => {
  const [, setLocation] = useLocation();

  const { state } = useContext(AuthContext);
  const {
    user: { roles },
  } = state;
  return (
    <Card className="w-auto max-w-xl m-auto box-border">
      <Flex className="justify-between items-center">
        <Title>Users Dashboard</Title>
        <Button
          onClick={() => setLocation("/")}
          icon={ArrowLeftIcon}
          variant="light"
        >
          Volver
        </Button>
      </Flex>
      <TabGroup>
        <TabList className="mt-8">
          <Tab icon={UserGroupIcon}>List of users</Tab>
          {roles.includes(ROLES.ADMIN || ROLES.MOD) && (
            <Tab icon={UserIcon}>Add user</Tab>
          )}
        </TabList>
        <TabPanels>
          <TabPanel>
            <UsersList />
          </TabPanel>
          {roles.includes(ROLES.ADMIN || ROLES.MOD) && (
            <TabPanel>
              <CreateUser />
            </TabPanel>
          )}
        </TabPanels>
      </TabGroup>
    </Card>
  );
};
