"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  FieldValues,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import { Label } from "@/components/ui/label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rules?: RegisterOptions;
  endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, rules, endAdornment, ...props }, ref) => {
    // has-[:focus]:ring-2
    const { control, reset, getValues } = useFormContext();
    const {
      field: { value, onChange, ...rest },
      fieldState: { error },
    } = useController({
      name: id || "",
      control,
      rules,
    });

    return (
      <div style={{ width: props?.width }}>
        <Label htmlFor={id} className={`${error?.message && "text-red-400"}`}>
          {label}
        </Label>
        <div
          className={cn(
            " flex h-10 items-center  w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  ",
            className
          )}
        >
          <input
            value={value}
            {...props}
            onChange={onChange}
            className="flex-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            type={type}
            {...rest}
          />
          {endAdornment ?? null}
        </div>
        <p className="text-red-400">{error?.message}</p>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
