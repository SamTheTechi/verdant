import { Link, LinkProps } from "react-router-dom"

type ButtonLinkProps = LinkProps & {
  variant?: "default" | "destructive" | "outline",
  size?: "sm" | "lg" | "md",
  className?: string
}


const variants = {
  default: "bg-primary text-background hover:bg-secondary",
  destructive: "bg-red-600 text-background hover:bg-red-500",
  outline: "border border-2 border-primary text-text hover:bg-secondary/50",
}

const sizes = {
  sm: "h-8 min-w-12 px-4 text-sm",
  md: "h-9 min-w-16 px-5 py-2",
  lg: "h-10 min-w-20 px-7 text-base",
}

export const ButtonLink = ({
  variant = "default",
  size = "lg",
  className = "",
  ...props
}: ButtonLinkProps) => {
  const variantClass = variants[variant] || variants.default
  const sizeClass = sizes[size] || sizes.md

  return (
    <Link
      className={`"inline-flex flex items-center justify-center rounded-xl text-base font-medium transition-all disabled:opacity-50 pointer-events-auto focus:outline-none" ${variantClass} ${sizeClass} ${className}`}
      {...props}
    />
  )
}
