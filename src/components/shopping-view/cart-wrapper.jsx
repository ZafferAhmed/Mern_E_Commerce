import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";

const UserCartWrapper = ({ cartItems }) => {
  const totalAmount = cartItems.reduce(
    (acc, item) =>
      acc + (item?.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
    0
  );

  return (
    <SheetContent className="sm:max-w-md overflow-y-auto">
      <SheetHeader className="text-2xl font-semibold tracking-tight">
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-4">
        <UserCartItemsContent cartItems={cartItems} />
      </div>

      <div className="mt-8 space-y-4 px-2">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <Button className="w-full mt-6 " variant="default">
        Checkout
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
