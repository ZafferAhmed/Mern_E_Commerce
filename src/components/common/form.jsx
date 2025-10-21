import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Eye, EyeClosed } from "lucide-react";

const InputTypes = {
  INPUT: "input",
  SELECT: "select",
  TEXTAREA: "textarea",
};

const CommonForm = ({
  formControls = [],
  formData = {},
  setFormData,
  onSubmit,
  buttonText,
  isButtonDisabled,
}) => {
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const togglePasswordVisibility = (fieldName) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const renderInputsByComponentType = (getControlItems) => {
    const value = formData[getControlItems.name] || "";

    switch (getControlItems.componentType) {
      case InputTypes.INPUT:
        if (getControlItems.type === "password") {
          const isVisible = visiblePasswords[getControlItems.name];
          return (
            <div className="relative">
              <Input
                name={getControlItems.name}
                placeholder={getControlItems.placeholder}
                type={isVisible ? "text" : "password"}
                id={getControlItems.name}
                value={value}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [getControlItems.name]: event.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility(getControlItems.name)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {isVisible || !value ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
          );
        }

        return (
          <Input
            name={getControlItems.name}
            placeholder={getControlItems.placeholder}
            type={getControlItems.type}
            id={getControlItems.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItems.name]: event.target.value,
              })
            }
          />
        );

      case InputTypes.SELECT:
        return (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({ ...formData, [getControlItems.name]: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItems.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItems.options?.length > 0 &&
                getControlItems.options.map((optionItem) => (
                  <SelectItem key={optionItem.id} value={optionItem.id}>
                    {optionItem.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        );

      case InputTypes.TEXTAREA:
        return (
          <Textarea
            name={getControlItems.name}
            placeholder={getControlItems.placeholder}
            id={getControlItems.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItems.name]: event.target.value,
              })
            }
            rows={getControlItems.rows || 5}
            cols={getControlItems.cols || 40}
            maxLength={getControlItems.maxLength}
            className="w-full border rounded-md p-2"
          />
        );

      default:
        return (
          <Input
            name={getControlItems.name}
            placeholder={getControlItems.placeholder}
            type={getControlItems.type}
            id={getControlItems.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItems.name]: event.target.value,
              })
            }
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3 border p-5 rounded-lg bg-gray-300/20">
        {formControls.map((controlItems) => (
          <div key={controlItems.name} className="grid w-full gap-1.5">
            <Label className="mb-1" htmlFor={controlItems.name}>
              {controlItems.label}
            </Label>
            {renderInputsByComponentType(controlItems)}
          </div>
        ))}
      </div>
      <Button disabled={isButtonDisabled} className="mt-2 w-full" type="submit">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
