import { Card, Flex } from "@tremor/react";
import { useContext } from "react";

import { Link } from "wouter";
import { AuthContext } from "../context/auth";
import { ROLES } from "../constants";

export const NavBar = () => {
  const { state } = useContext(AuthContext);
  const { isAuthenticated, user } = state;
  return (
    <Card className="w-full mb-7 rounded-none">
      <Flex className="justify-evenly text-white">
        <div>
          <Link to="/" className="hover:opacity-70">
            Home
          </Link>
        </div>
        {isAuthenticated && (
          <>
            <div>
              <Link to="/users" className="hover:opacity-70">
                Users
              </Link>
            </div>
            {(user.roles.includes(ROLES.ADMIN) || user.roles.includes(ROLES.MOD)) && (
              <div>
                <Link to ="/admin"className="hover:opacity-70">
                  Administración
                </Link>
              </div>
            )}  
          </>
        )}
      </Flex>
    </Card>
  );
};
