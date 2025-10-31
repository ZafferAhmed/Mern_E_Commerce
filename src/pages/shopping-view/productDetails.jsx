import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Star } from "lucide-react";
import { Input } from "@/components/ui/input";

const ShoppingProductDetails = ({
  open,
  setOpen,
  ProductDetails,
  handleAddToCart,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[65vw] xl:max-w-[55vw] 2xl:max-w-[45vw] rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b bg-muted/40">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="rounded-full hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
              Product Details
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 p-4 sm:p-6 md:p-8">
          <div className="flex justify-center items-center">
            <img
              src={ProductDetails?.image}
              alt={ProductDetails?.title}
              className="object-contain w-full max-w-[420px] h-[140px] sm:h-[220px] md:h-[250px] lg:h-[300px] transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {ProductDetails?.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                {ProductDetails?.brand}
              </p>

              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize">
                {ProductDetails?.category}
              </span>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="text-gray-400 line-through text-base sm:text-lg">
                  ₹{ProductDetails?.price}
                </span>
                <span className="text-green-600 text-2xl sm:text-3xl font-bold">
                  ₹{ProductDetails?.salePrice}
                </span>
              </div>

              <DialogDescription className="text-gray-700 text-sm sm:text-base leading-relaxed mt-4">
                {ProductDetails?.description}
              </DialogDescription>
            </div>

            <div className="border-t pt-4 flex flex-col sm:flex-row justify-between gap-2 text-xs sm:text-sm text-gray-700">
              <p>
                <span className="font-medium text-gray-900">Total Stock:</span>{" "}
                {ProductDetails?.totalStock}
              </p>
              <p>
                <span className="font-medium text-gray-900">Created:</span>{" "}
                {new Date(ProductDetails?.createdAt).toLocaleDateString(
                  "en-IN"
                )}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="max-h-[300px] md:max-h-[350px] overflow-y-auto px-4 sm:px-6 py-5">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">
            Customer Reviews
          </h3>

          {ProductDetails?.reviews && ProductDetails.reviews.length > 0 ? (
            <div className="space-y-6">
              {ProductDetails.reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex gap-4 border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
                >
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>
                      {review.user?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">
                        {ProductDetails?.user?.userName}
                      </h3>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-gray-900">
                        {review.user}
                      </p>
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-snug">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">No reviews yet.</p>
          )}

          <div className="mt-6 flex gap-2">
            <Input type="text" placeholder="Write a review..." />
            <Button>Submit</Button>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row justify-end gap-3 px-4 sm:px-6 py-4 sm:py-6 border-t bg-muted/30">
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
          <Button
            className=""
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(ProductDetails?._id);
            }}
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingProductDetails;
