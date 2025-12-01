import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HousePlug,
  LogOut,
  Menu,
  ShoppingCart,
  UserRoundCog,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { logoutUser } from "@/store/auth-slice";
import { shoppingViewHeaderMenuItems } from "@/config";
import UserCartWrapper from "./cart-wrapper";
import { Badge } from "@/components/ui/badge";
import { fetchCartItems } from "@/store/shop/cartSlice";

const ShoppingViewHeader = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const [openMenuSheet, setOpenMenuSheet] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [isAuthenticated, user?.id, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser()).then((data) => {
      toast({
        title:
          data?.payload?.message ||
          (data?.payload?.success
            ? "Logged out successfully"
            : "Something went wrong"),
        variant: data?.payload?.success ? "success" : "destructive",
      });
    });
  };

  const MenuItems = () => (
    <nav className="flex flex-col xl:flex-row gap-3 lg:gap-6 text-base font-medium">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className="transition-all px-3 py-1.5 rounded-md hover:bg-muted hover:text-primary hover:scale-105 duration-300"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );

  const HeaderRightContent = () => {
    return (
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="relative hover:bg-muted transition"
          onClick={() => {
            setOpenMenuSheet(false);
            setOpenCartSheet(true);
          }}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-3 -right-3 px-2 text-[10px] rounded-full"
            >
              {cartItems.length}
            </Badge>
          )}
          <span className="sr-only">User Cart</span>
        </Button>
        <Sheet
          key="user-cart"
          open={openCartSheet}
          onOpenChange={setOpenCartSheet}
        >
          <UserCartWrapper
            openCartSheet={openCartSheet}
            setOpenCartSheet={setOpenCartSheet}
            cartItems={cartItems}
          />
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer bg-black hover:opacity-90 transition">
              <AvatarFallback className="bg-black text-white font-semibold">
                {user?.userName?.charAt(0)?.toUpperCase() ||
                  user?.user?.userName?.charAt(0)?.toUpperCase() || (
                    <img
                      src="https://img.freepik.com/free-vector/isometric-laptop-with-shopping-cart-keypad_1262-16544.jpg"
                      className="w-full object-cover rounded-full border border-black"
                      alt="Website Image"
                    />
                  )}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-56">
            <DropdownMenuLabel>
              Logged in as {user?.userName || user?.user?.userName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigate("/shopping/accounts");
                setOpenMenuSheet(false);
              }}
              className="cursor-pointer"
            >
              <UserRoundCog className="h-4 w-4 mr-2" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="sm:hidden" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600 cursor-pointer sm:hidden lg:flex"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        <Link to="/shopping/home" className="flex items-center gap-3">
          <HousePlug className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">E-Commerce</span>
        </Link>
        <div className="xl:hidden flex items-center">
          <Sheet open={openMenuSheet} onOpenChange={setOpenMenuSheet}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setOpenMenuSheet(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 p-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-4 md:px-6 h-16">
                  <Link
                    to="/shopping/home"
                    className="flex items-center gap-3"
                    onClick={() => setOpenMenuSheet(false)}
                  >
                    <HousePlug className="h-6 w-6 text-primary" />
                    <SheetTitle className="font-bold text-xl">
                      E-Commerce
                    </SheetTitle>
                    <SheetDescription />
                  </Link>
                </div>
                <div className="pl-6">
                  {shoppingViewHeaderMenuItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setOpenMenuSheet(false)}
                      className="transition-all px-3 py-1.5 rounded-md hover:bg-muted hover:text-primary hover:scale-105 duration-300 block"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {isAuthenticated && (
                  <div className="flex flex-col gap-3 mt-4 border-t pt-3">
                    <HeaderRightContent />
                    <Button
                      onClick={() => {
                        handleLogout();
                        setOpenMenuSheet(false);
                      }}
                      variant="destructive"
                      size="sm"
                      className="w-full mt-2"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden xl:flex items-center gap-10">
          <MenuItems />
        </div>
        <div className="hidden xl:flex items-center gap-5">
          {isAuthenticated && <HeaderRightContent />}
        </div>
      </div>
    </header>
  );
};

export default ShoppingViewHeader;
