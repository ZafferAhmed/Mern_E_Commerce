/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFilteredProducts,
  getProductDetails,
} from "@/store/shop/productSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router-dom";
import ShoppingProductDetails from "./productDetails";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { useToast } from "@/hooks/use-toast";

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    } else if (!Array.isArray(value) && value) {
      queryParams.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  return queryParams.join("&");
};

const ShoppingViewListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const { ProductDetails } = useSelector((state) => state.shopProducts);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const fetchingProducts = async () => {
    setLoading(true);
    const data = await dispatch(
      getAllFilteredProducts({
        filteredParams: filters,
        sortParams: sort,
      })
    );
    setProducts(data?.payload?.data);
    setLoading(false);
  };

  const sortProducts = (type) => {
    let sorted = [...products];
    if (type === "price-lowtohigh") sorted.sort((a, b) => a.price - b.price);
    if (type === "price-hightolow") sorted.sort((a, b) => b.price - a.price);
    if (type === "title-atoz")
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (type === "title-ztoa")
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    setProducts(sorted);
  };

  const handleSortChange = (value) => {
    setSort(value);
    sortProducts(value);
  };

  const handleFilterChange = (getSectionId, getCurrentOption) => {
    let cpyFilters = { ...filters };

    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };

  const handleGetProductDetails = async (getCurrentProductId) => {
    await dispatch(getProductDetails(getCurrentProductId));
    setIsProductDetailsOpen(true);
  };

  const handleAddToCart = async (getCurrentProductId) => {
    const data = await dispatch(
      addToCart({
        userId: user.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    );

    if (data?.payload?.success) {
      if (setIsProductDetailsOpen) {
        setIsProductDetailsOpen(false);
      }
      toast({
        title: data?.payload?.message || "Product added to cart successfully",
        variant: "success",
      });
      await dispatch(fetchCartItems(user.id));
    } else {
      toast({
        title: "Failed to add item",
        description: data?.payload?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    const paramsArray = Array.from(searchParams.entries()).map(
      ([key, value]) => `${key}=${value}`
    );
  }, [searchParams]);

  useEffect(() => {
    if (filters && sort) {
      fetchingProducts();
    }
  }, [filters, sort]);

  useEffect(() => {
    if (ProductDetails !== null) {
      setIsProductDetailsOpen(true);
    }
  }, [ProductDetails]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 w-full min-h-screen">
      <ProductFilter
        filters={filters}
        handleFilterChange={handleFilterChange}
      />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {products?.length} Products
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={handleSortChange}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.id} value={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <Skeleton className="h-10 bg-gray-100 w-full rounded-xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
            <ShoppingProductTile
              products={products}
              handleGetProductDetails={handleGetProductDetails}
              handleAddToCart={handleAddToCart}
            />
          </div>
        )}
      </div>
      <ShoppingProductDetails
        open={isProductDetailsOpen}
        setOpen={setIsProductDetailsOpen}
        ProductDetails={ProductDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingViewListing;
