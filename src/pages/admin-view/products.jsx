import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProductImageUpload from "./image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  // deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "@/store/admin/productSlice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "./product-tile";
import AdminProductDetails from "./productDetails";
import DeleteConfirmation from "@/components/common/deleteConfirmation";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: 0,
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList, productDetails } = useSelector(
    (state) => state.adminProducts
  );
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          updateProduct({
            id: currentEditedId,
            updatedData: formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            toast({
              title: data?.payload?.message || "Product updated successfully",
              variant: "success",
            });
          } else {
            toast({
              title: data?.payload?.message || "Error updating product",
              variant: "warning",
            });
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image:
              uploadedImageURL ||
              "https://img.freepik.com/premium-vector/vector-illustration-advertising-sale-banner-template-design-best-product-corner-sticker-with-thumb_1124803-716.jpg?w=360",
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: data?.payload?.message || "Product added successfully",
              variant: "success",
            });
          } else {
            toast({
              title: data?.payload?.message || "Error adding product",
              variant: "warning",
            });
          }
        });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  const handleDeleteConfirmation = (productId) => {
    setSelectedProductId(productId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedProductId) return;

    dispatch(deleteProduct(selectedProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllProducts());
        toast({
          title: data?.payload?.message || "Product deleted successfully",
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

  const handleGetProductClick = async (getProductId) => {
    await dispatch(getProductById(getProductId));
    setIsProductDetailsOpen(true);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productList !== null) {
      setIsProductDetailsOpen(false);
    }
  }, [productList]);

  return (
    <>
      <div>
        <div className="mb-5 w-full flex justify-end">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(null);
              setFormData(initialFormData);
            }}
          >
            <Plus />
            Add New Product
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
          {productList && productList?.data?.length > 0 ? (
            productList.data.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                product={productItem}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setFormData={setFormData}
                handleDelete={handleDeleteConfirmation}
                handleGetProductClick={handleGetProductClick}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-40 col-span-full">
              No products found
            </div>
          )}
        </div>

        <Sheet
          open={openCreateProductsDialog}
          onOpenChange={(open) => {
            setOpenCreateProductsDialog(open);
            if (!open) {
              setCurrentEditedId(null);
              setImageFile(null);
              setUploadedImageURL(null);
              setFormData(initialFormData);
            }
          }}
        >
          <SheetContent side="right" className="h-full overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {currentEditedId ? "Edit Product" : "Add New Product"}
              </SheetTitle>
            </SheetHeader>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageURL={uploadedImageURL}
              setUploadedImageURL={setUploadedImageURL}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            <div className="py-6">
              <CommonForm
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId ? "Update Product" : "Add Product"}
                onSubmit={onSubmit}
                formControls={addProductFormElements}
                isButtonDisabled={!isFormValid()}
              />
            </div>
          </SheetContent>
        </Sheet>

        <AdminProductDetails
          productDetails={productDetails}
          isProductDetailsOpen={isProductDetailsOpen}
          setIsProductDetailsOpen={setIsProductDetailsOpen}
        />

        <DeleteConfirmation
          open={isDeleteConfirmationOpen}
          setOpen={setIsDeleteConfirmationOpen}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </>
  );
};

export default AdminProducts;
