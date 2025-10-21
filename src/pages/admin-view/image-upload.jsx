/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloudUpload, FileIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageURL,
  setUploadedImageURL,
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
}) => {
  const inputRef = useRef(null);
  const { toast } = useToast();
  const [previewURL, setPreviewURL] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        const localPreview = URL.createObjectURL(selectedFile);
        setPreviewURL(localPreview);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);

      if (droppedFile.type.startsWith("image/")) {
        const localPreview = URL.createObjectURL(droppedFile);
        setPreviewURL(localPreview);
      }
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewURL(null);
    setUploadedImageURL(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const updateImageToCloudinary = async () => {
    if (!imageFile) return;
    const data = new FormData();
    data.append("my_file", imageFile);
    setIsUploading(true);
    setImageLoadingState(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/products/upload-image",
        data
      );

      const payload = response.data;

      let cloudUrl = null;
      if (payload?.url) {
        cloudUrl =
          typeof payload.url === "string"
            ? payload.url
            : payload.url.secure_url || payload.url.url || null;
      }

      if (!cloudUrl) {
        cloudUrl = payload?.data?.url?.secure_url || payload?.data?.url || null;
      }

      if (!cloudUrl) {
        toast({
          title: "Upload succeeded but no URL returned",
          variant: "destructive",
        });
        return;
      }

      if (previewURL) {
        URL.revokeObjectURL(previewURL);
        setPreviewURL(null);
      }

      setUploadedImageURL(cloudUrl);
      toast({ title: payload?.message || "Uploaded", variant: "success" });
      setImageLoadingState(false);
    } catch (err) {
      console.error("Upload failed:", err);
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (imageFile) {
      updateImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-md font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4"
      >
        <Input
          className="hidden"
          id="image-upload"
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center ${
              isEditMode ? "cursor-not-allowed opacity-60" : "cursor-pointer"
            }`}
          >
            <CloudUpload className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              Drag & drop or click to upload
            </span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100 w-full rounded-xl" />
        ) : (
          <div className="flex items-center justify-between gap-4">
            {previewURL || uploadedImageURL ? (
              <img
                src={uploadedImageURL || previewURL}
                alt="Preview"
                className={`w-16 h-16 object-cover rounded-md border transition-opacity duration-300 ${
                  isUploading ? "opacity-70" : "opacity-100"
                }`}
              />
            ) : (
              <FileIcon className="w-8 h-8 text-primary" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium truncate max-w-[200px]">
                {imageFile.name.length > 20
                  ? imageFile.name.substring(0, 15) +
                    "..." +
                    imageFile.name.split(".").pop()
                  : imageFile.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {(imageFile.size / 1024).toFixed(2)} KB
                {isUploading && " • Uploading..."}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
              disabled={isUploading}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
