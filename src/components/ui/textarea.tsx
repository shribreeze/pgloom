import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "shadow-[0px_0px_1px_1px_#404040] placeholder:text-neutral-600 focus-visible:outline-none group-hover/input:shadow-none focus-visible:ring-neutral-600 dark:bg-zinc-800 flex field-sizing-content min-h-16 w-full rounded-md border-none bg-zinc-800 px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
