import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const ShoppingProductTile = ({ products, handleGetProductDetails }) => {
  return (
    <>
      {products?.map((product) => (
        <Card
          key={product._id}
          className="w-full max-w-sm mx-auto hover:shadow-lg transition-shadow capitalize hover:line-clamp-none cursor-pointer ease-in-out duration-500"
        >
          <div onClick={() => handleGetProductDetails(product._id)}>
            <div className="relative">
              <img
                src={
                  product?.image ||
                  "https://img.freepik.com/premium-vector/vector-illustration-advertising-sale-banner-template-design-best-product-corner-sticker-with-thumb_1124803-716.jpg?w=360"
                }
                alt={product?.title}
                className="w-full h-[250px] object-contain rounded-t-lg transition-transform duration-300 hover:scale-105"
              />

              {product?.salePrice > 0 ? (
                <Badge
                  className="absolute top-2 left-2 bg-red-500 hover:bg-red-600"
                  variant="destructive"
                >
                  Sale
                </Badge>
              ) : null}
            </div>
            <CardContent className="p-4">
              <h2 className="text-md font-semibold mb-2 line-clamp-1 hover:line-clamp-none transition-all duration-300">
                {product?.title}
              </h2>

              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground ">
                  {product?.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  {product?.brand}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3 justify-between">
                {product.salePrice > 0 ? (
                  <span className="text-green-600 font-bold text-md">
                    ${product.salePrice}
                  </span>
                ) : null}
                {product.price > 0 ? (
                  <span className="text-red-500 line-through text-sm">
                    ${product.price}
                  </span>
                ) : null}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </div>
        </Card>
      ))}
    </>
  );
};

export default ShoppingProductTile;
