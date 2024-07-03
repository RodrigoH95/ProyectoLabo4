import { Button, Card, Flex, Text } from "@tremor/react";
import { useContext } from "react";

import { Link, useLocation } from "wouter";
import { AuthContext } from "../context/auth";
import { ROLES } from "../constants";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";

export const NavBar = () => {
  const { state, handleLogout } = useContext(AuthContext);
  const { isAuthenticated, user } = state;

  const [_, setLocation] = useLocation();

  const handleToCart = () => {
    setLocation("/cart");
  }
  return (
    <Card className="w-full mb-7 rounded-none">
      <Flex className="justify-evenly text-white flex-col gap-4 md:flex-row">
        <div>
          <Link to="/" className="hover:opacity-70">
            Home
          </Link>
        </div>
        {isAuthenticated && (
          <>
            {(user.roles.includes(ROLES.ADMIN) || user.roles.includes(ROLES.MOD)) && (
              <div>
                <Link to="/admin" className="hover:opacity-70">
                  Admin
                </Link>
              </div>
            )}
          </>
        )}
          {isAuthenticated && (<div>
            <Button className="p-2 hover:opacity-70" onClick={() => handleToCart()} icon={ShoppingCartIcon}>
              Carrito
            </Button>
          </div>)
          }
          {isAuthenticated ? (

            <div className="flex justify-center gap-1 items-center">
              <Text>{user.name}</Text>
              <Button className="px-1 rounded" onClick={handleLogout} icon={ArrowLeftEndOnRectangleIcon} />
            </div>
          ) :
            (
              <Link to="/signin" className="hover:opacity-70">
                Ingreso
              </Link>
            )
          }
      </Flex>
    </Card >
  );
};
