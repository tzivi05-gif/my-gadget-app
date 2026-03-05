import { Link } from "react-router";
import { NavMenu as AppBridgeNavMenu } from "@shopify/app-bridge-react";

export function NavMenu() {
  return (
    <AppBridgeNavMenu>
      <Link to="/" rel="home">
        Shop Information
      </Link>
      <Link to="/products">
        Products
      </Link>
      <Link to="/orders">
        Orders
      </Link>
    </AppBridgeNavMenu>
  );
}
