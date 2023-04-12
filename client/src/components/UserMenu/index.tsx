import React, { Fragment, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logout } from "@/redux/features/userSlice";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const MenuItem = ({
  children,
  to,
  onClick,
}: {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
}) => {
  const className =
    "block px-4 py-2 text-sm text-gray-700 cursor-pointer text-right";
  return (
    <Menu.Item>
      {({ active }) =>
        to ? (
          <Link
            to={to}
            className={classNames(active ? "bg-gray-100" : "", className)}
          >
            {children}
          </Link>
        ) : (
          <a
            onClick={onClick}
            className={classNames(active ? "bg-gray-100" : "", className)}
          >
            {children}
          </a>
        )
      }
    </Menu.Item>
  );
};

const UserMenu = () => {
  const user = useAppSelector((state) => state.userState.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Cookies.remove("jwt");
    dispatch(logout());
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div className="flex space-x-4">
        <span>{user.ongName}</span>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={`https://i.pravatar.cc/150?u=${user?.email}`}
            alt="avatar"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem to="/">Acasă</MenuItem>
          <MenuItem onClick={handleLogout}> Log out</MenuItem>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
