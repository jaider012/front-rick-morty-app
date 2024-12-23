import { HTMLAttributes } from "react";
import clsx from "clsx";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "small";
  as?: keyof JSX.IntrinsicElements;
}

export function Typography({
  variant = "p",
  as,
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = (as || variant) as keyof JSX.IntrinsicElements &
    keyof HTMLElementTagNameMap;

  return (
    <Component
      className={clsx(
        "text-gray-900",
        {
          "text-4xl font-bold lg:text-5xl": variant === "h1",
          "text-3xl font-bold lg:text-4xl": variant === "h2",
          "text-2xl font-bold lg:text-3xl": variant === "h3",
          "text-xl font-semibold lg:text-2xl": variant === "h4",
          "text-base lg:text-lg": variant === "p",
          "text-sm ": variant === "small",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
