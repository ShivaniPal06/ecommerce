import React from "react";
import { NavLink } from "react-router-dom";

const menu = () => {
  return (
    <div>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action active"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default menu;
