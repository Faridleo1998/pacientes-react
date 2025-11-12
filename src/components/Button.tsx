import { Button as ButtonShadcn, buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps } from "react";
import { Spinner } from "./ui/spinner";

interface ButtonWrapperProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonWrapperProps>(
  (
    {
      children,
      loading = false,
      disabled,
      variant,
      size,
      asChild,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <ButtonShadcn
        ref={ref}
        disabled={isDisabled}
        variant={variant}
        size={size}
        asChild={asChild}
        aria-busy={loading}
        aria-disabled={isDisabled}
        aria-live={loading ? "polite" : undefined}
        className={`cursor-pointer ${isDisabled ? "cursor-not-allowed" : ""} ${className}`}
        {...props}
      >
        {loading ? (
          <Spinner />
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}
        <span>{children}</span>
      </ButtonShadcn>
    );
  }
);

export default Button;
