import React from "react";
import {clsx} from "clsx";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
}

export default function Label({className, children, ...props}: LabelProps) {
  return (
    <label className={clsx("text-beige-500 font-bold text-xs leading-1.5", className)} {...props}>
      {children}
    </label>
  )

}
