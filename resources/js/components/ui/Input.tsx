import {clsx} from 'clsx'
import React from "react";

export default function Input({className, type, ...props}: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={clsx("border py-3 text-grey-900 border-beige-500 rounded-md p-2 hover:border-grey-500 focus:border-grey-900 focus:outline-none", className)}
      {...props}
    />
  )
}
