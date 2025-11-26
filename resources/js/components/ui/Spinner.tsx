import React from "react";
import {SpinnerIcon} from "@phosphor-icons/react";
import {clsx} from "clsx";

export default function Spinner({className, ...props}: React.ComponentProps<"svg">) {
  return (
    <SpinnerIcon
      role="status"
      aria-label="Loading..."
      className={clsx("size-4 animate-spin", className)}
      {...props}
    />
  )
}
