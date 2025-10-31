import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, fetchCartItems } from "@/store/shop/cartSlice";
import { useToast } from "@/hooks/use-toast";

const UserCartItemsContent = ({ cartItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  if (!cartItems?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div
          onClick={() => navigate("/")}
          className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4"
        >
          <ShoppingCart className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground text-sm">
          Add some items to get started
        </p>
      </div>
    );
  }

  const handleCartItemDelete = async (item) => {
    try {
      const response = await dispatch(
        deleteCartItem({ userId: user.id, productId: item.productId })
      ).unwrap();

      if (response?.success) {
        toast({
          title: response?.message || "Item removed successfully",
          variant: "success",
        });
        await dispatch(fetchCartItems(user.id));
      } else {
        toast({
          title: "Failed to remove item",
          description: response?.message || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Delete cart error:", error);
      toast({
        title: "Error removing item",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {cartItems.map((item) => (
        <Card
          key={item._id}
          className="overflow-hidden hover:shadow-md transition-shadow"
        >
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm line-clamp-2 pr-2">
                    {item.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleCartItemDelete(item)}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Qty:</span>
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 rounded-r-none"
                      >
                        <Minus className="w-3 h-3" />
                        <span className="sr-only">Decrease</span>
                      </Button>
                      <Input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-12 h-8 text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 rounded-l-none"
                      >
                        <Plus className="w-3 h-3" />
                        <span className="sr-only">Increase</span>
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">
                      $
                      {(
                        (item.salePrice > 0 ? item.salePrice : item.price) *
                        item.quantity
                      ).toFixed(2)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-muted-foreground">
                        ${item.salePrice > 0 ? item.salePrice : item.price} each
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserCartItemsContent;
