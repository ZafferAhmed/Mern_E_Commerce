import {
  ChartNoAxesCombined,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: 1,
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: 2,
    label: "Products",
    path: "/admin/products",
    icon: <Package />,
  },
  {
    id: 3,
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCart />,
  },
  {
    id: 4,
    label: "Features",
    path: "/admin/features",
    icon: <Sparkles />,
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="mt-8 flex flex-col gap-2">
        {adminSidebarMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setOpen ? setOpen(false) : null;
              }}
              className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 transition-all ease-in-out hover:bg-muted hover:text-primary hover:scale-105 duration-500"
            >
              {Icon}
              <span className="text-base font-medium">{item.label}</span>
            </div>
          );
        })}
      </nav>
    </>
  );
};

const AdminViewSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-60">
          <div className="flex flex-col h-full cursor-pointer">
            <SheetHeader className="border-b pb-3">
              <div
                onClick={() => {
                  navigate("/admin/dashboard");
                  setOpen ? setOpen(false) : null;
                }}
                className="flex items-center gap-2 mt-2"
              >
                <ChartNoAxesCombined size={24} />
                <SheetTitle className="text-lg font-bold">
                  <span className="text-2xl font-extrabold">Admin Panel</span>
                </SheetTitle>
              </div>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden lg:flex w-60 h-full flex-col border-r bg-background p-6">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={28} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
};

export default AdminViewSidebar;
