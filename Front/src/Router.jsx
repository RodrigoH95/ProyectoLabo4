import { MessageCard } from "@/components/message-card";
import { ROLES } from "@/constants";
import { AuthContext } from "@/context/auth";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@tremor/react";
import { useContext } from "react";
import { Route, Switch } from "wouter";
import { ProductContainer } from "./components/products/product-container";
import { UpdateProduct } from "./components/products/update-product";
import { ProductListUsers } from "./components/products/product-list-users";
import { ProductDetails } from "./components/products/product-details";
import { AuthContainer } from "./components/auth/auth-container";
import { UserCart } from "./components/products/user-cart";

export const Router = () => {
  const { state, handleLogout } = useContext(AuthContext);
  const { isAuthenticated, user } = state;
  return (
    <Switch>
      <Route path="/">
        <MessageCard message="Bienvenido a CompuTienda" />
        <ProductListUsers />
      </Route>
      <Route path="/signin/:redirect?">
        {isAuthenticated ? (
          <MessageCard message={`Welcome ${user.name}`}>
            <Button onClick={handleLogout} icon={ArrowLeftEndOnRectangleIcon}>
              Logout
            </Button>
          </MessageCard>
        ) 
        : (<AuthContainer />)}
      </Route>
      <Route path="/product/:id" component={ProductDetails} />
      
      {isAuthenticated && (user.roles.includes(ROLES.ADMIN) || user.roles.includes(ROLES.MOD)) && (
        <Route path="/admin" component={ProductContainer} />
      )}

      {isAuthenticated && (user.roles.includes(ROLES.ADMIN) || user.roles.includes(ROLES.MOD)) && (
        <Route path="/admin/product/:id" component={UpdateProduct} />
      )}

      {isAuthenticated && (
        <Route path="/cart" component={UserCart} />
      )}
      <Route>
        <MessageCard message="404 - Not Found" />
      </Route>
    </Switch>
  );
};
