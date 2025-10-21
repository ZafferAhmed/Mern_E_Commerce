import React from "react";
import { Button } from "../ui/button";
import { LogOut, TextAlignStart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const AdminViewHeader = ({ setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleLogout = () => {
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message || "Logged out successfully",
          variant: "success",
        });
      } else {
        toast({
          title: data?.payload?.message || "Something went wrong",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <>
      <header className="flex items-center w-full justify-between px-6 py-4 bg-background border-b shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setOpen(true)}
            className="lg:hidden flex items-center gap-2 w-full px-1 "
            variant="ghost"
            size="icon"
          >
            <TextAlignStart className="h-6 w-6" />
            <span className="text-xs text-muted-foreground">Menu</span>
            <span className="sr-only">Toggle Menu</span>
          </Button>

          <div
            onClick={() => navigate("/admin/dashboard")}
            className="hidden lg:flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            <img
              src="https://cdn-icons-png.freepik.com/512/6072/6072941.png"
              alt="Shopping Icon"
              className="w-12 h-12 object-contain"
            />
            <span className="text-xl font-bold text-primary">E-Commerce</span>
          </div>
        </div>

        <div className="flex flex-1 justify-center px-6">
          <Input
            name="search"
            placeholder="Search products, orders..."
            type="text"
            id="search"
            className="w-full max-w-xl rounded-lg px-4 py-2 text-base"
          />
        </div>

        <div className="flex items-center">
          <Button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
    </>
  );
};

export default AdminViewHeader;
