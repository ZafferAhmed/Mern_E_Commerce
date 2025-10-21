import { filterOptions } from "@/config";
import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = ({ filters, handleFilterChange }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm sm:w-52 w-full">
      <div className="p-4 border-b mt-2">
        <h2 className="text-lg font-bold">Filters</h2>
      </div>

      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((sectionId) => (
          <div key={sectionId}>
            <div className="flex flex-col space-x-2">
              <h3 className="text-base font-semibold capitalize">
                {sectionId}
              </h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[sectionId].map((option) => {
                  if (!option?.value) return null;

                  const isChecked =
                    filters?.[sectionId]?.includes(option.value) || false;

                  return (
                    <Label
                      key={`${sectionId}-${option.value}`}
                      className="flex items-center gap-2 font-medium"
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() =>
                          handleFilterChange(sectionId, option.value)
                        }
                      />
                      {option.label}
                    </Label>
                  );
                })}
              </div>
            </div>
            <Separator className="my-3" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
