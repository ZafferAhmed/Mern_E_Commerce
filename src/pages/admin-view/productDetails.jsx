import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import React from "react";

const AdminProductDetails = ({
  isProductDetailsOpen,
  setIsProductDetailsOpen,
  productDetails,
}) => {
  if (!productDetails) return null;

  return (
    <Dialog open={isProductDetailsOpen} onOpenChange={setIsProductDetailsOpen}>
      <DialogContent className="max-w-4xl w-full rounded-xl p-0 overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsProductDetailsOpen(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-xl font-semibold">
              Product Details
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="flex justify-center items-center ">
            <img
              src={productDetails.image}
              alt={productDetails.title}
              className="object-contain w-full h-[320px] rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">
                {productDetails.title}
              </h2>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                {productDetails.brand}
              </p>

              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {productDetails.category}
              </span>

              <div className="flex items-center gap-3 mt-3">
                <span className="text-gray-400 line-through text-lg">
                  ₹{productDetails.price}
                </span>
                <span className="text-green-600 text-3xl font-bold">
                  ₹{productDetails.salePrice}
                </span>
              </div>

              <DialogDescription className="text-gray-600 leading-relaxed mt-4">
                {productDetails.description}
              </DialogDescription>
            </div>

            <div className="mt-6 border-t pt-4 text-sm text-gray-700 flex justify-between gap-2">
              <p>
                <span className="font-medium text-gray-900">Total Stock:</span>
                {productDetails.totalStock}
              </p>
              <p>
                <span className="font-medium text-gray-900">Created:</span>
                {new Date(productDetails.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-3 p-6 border-t">
          <Button
            variant="secondary"
            onClick={() => setIsProductDetailsOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminProductDetails;
