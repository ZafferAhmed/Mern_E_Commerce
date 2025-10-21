import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const DeleteConfirmation = ({ open, setOpen, onConfirm }) => {
  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete this product ?</DialogTitle>
          <DialogDescription>
            This will permanently remove the product from your inventory. You
            won’t be able to restore it later. Do you want to continue?
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="outline" onClick={handleCancel}>
            No
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmation;
