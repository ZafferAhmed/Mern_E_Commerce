import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminProductTile = ({
  product,
  setCurrentEditedId,
  setOpenCreateProductsDialog,
  setFormData,
  handleDelete,
  handleGetProductClick
}) => {


  return (
    <Card
      key={product._id}
      onClick={()=>handleGetProductClick(product._id)}
      className="w-full h-fit max-w-sm mx-auto cursor-pointer transition-all ease-in-out duration-700 hover:shadow-lg"
    >
      <div className="relative w-full h-48">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-contain p-1 rounded-t-lg"
        />
      </div>

      <CardHeader className="flex justify-center flex-col">
        <CardTitle className="text-md font-semibold mb-2 line-clamp-1 hover:line-clamp-none ease-in-out transition-all duration-300">
          {product.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </CardDescription>

        <div className="flex items-center gap-2 mt-3 justify-between">
          {product.salePrice > 0 ? (
            <span className="text-green-600 font-bold text-sm">
              ${product.salePrice}
            </span>
          ) : null}
          {product.price > 0 ? (
            <span className="text-red-500 line-through text-sm">
              ${product.price}
            </span>
          ) : null}
        </div>

        <div className="gap-2 mt-4 flex justify-around">
          <Button
            variant="secondary"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(product?._id);
            }}
          >
            Delete
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default AdminProductTile;
