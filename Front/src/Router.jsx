import { Login } from "@/components/auth/login";
import { MessageCard } from "@/components/message-card";
import { UpdateUser } from "@/components/user/update-user";
import { UserContainer } from "@/components/user/user-container";
import { ROLES } from "@/constants";
import { AuthContext } from "@/context/auth";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@tremor/react";
import { useContext } from "react";
import { Route, Switch } from "wouter";
import { ProductListAdmin } from "./components/products/product-list-admin";
import { ProductContainer } from "./components/products/product-container";
import { UpdateProduct } from "./components/products/update-product";
import { ProductListUsers } from "./components/products/product-list-users";
import { ProductDetails } from "./components/products/product-details";

export const Router = () => {
  const { state, handleLogout } = useContext(AuthContext);
  const { isAuthenticated, user } = state;
  return (
    <Switch>
      <Route path="/">
        <MessageCard message="Bienvenido a CompuTienda" />
        <ProductListUsers />
      </Route>
      <Route path="/signin">
        {/* Aca van los productos */}
        {isAuthenticated ? (
          <MessageCard message={`Welcome ${user.name}`}>
            <Button onClick={handleLogout} icon={ArrowLeftEndOnRectangleIcon}>
              Logout
            </Button>
          </MessageCard>
        ) : (
          <Login />
        )}
      </Route>
      <Route path="/product/:id" component={ProductDetails} />
      {isAuthenticated && <Route path="/users" component={UserContainer} />}
      {isAuthenticated && (user.roles.includes(ROLES.ADMIN) || user.roles.includes(ROLES.MOD)) && (
        <Route path="/users/:id" component={UpdateUser} />
      )}

      {isAuthenticated && (user.roles.includes(ROLES.ADMIN) || user.roles.includes(ROLES.MOD)) && (
        <Route path="/admin" component={ProductContainer} />
      )}

      {isAuthenticated && (user.roles.includes(ROLES.ADMIN) || user.roles.includes(ROLES.MOD)) && (
        <Route path="/admin/product/:id" component={UpdateProduct} />
      )}
      <Route>
        <MessageCard message="404 - Not Found" />
      </Route>
    </Switch>
  );
};
