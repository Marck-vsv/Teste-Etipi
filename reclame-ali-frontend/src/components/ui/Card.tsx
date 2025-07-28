import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentProps, type ReactNode } from 'react';

const cardVariants = cva(
  'rounded-lg border bg-white text-gray-950 shadow transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-gray-200 shadow-sm hover:shadow-md',
        elevated: 'border-gray-200 shadow-lg hover:shadow-xl',
        outlined: 'border-2 border-gray-300 shadow-none hover:border-gray-400',
        ghost: 'border-transparent shadow-none bg-transparent',
        gradient:
          'border-transparent shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
    },
  },
);

const cardHeaderVariants = cva('flex flex-col space-y-1.5', {
  variants: {
    size: {
      sm: 'pb-2',
      md: 'pb-4',
      lg: 'pb-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const cardContentVariants = cva('', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const cardFooterVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'pt-2',
      md: 'pt-4',
      lg: 'pt-6',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    size: 'md',
    justify: 'start',
  },
});

const cardTitleVariants = cva('font-semibold leading-none tracking-tight', {
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const cardDescriptionVariants = cva('text-gray-500', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// --------------------------------------

export interface BodyProps
  extends ComponentProps<'div'>,
    VariantProps<typeof cardVariants> {
  children: ReactNode;
}

const Body = forwardRef<HTMLDivElement, BodyProps>(
  ({ className, variant, size, interactive, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cardVariants({ variant, size, interactive, className })}
      {...props}
    >
      {children}
    </div>
  ),
);
Body.displayName = 'CardBody';

// --------------------------------------

export interface HeaderProps
  extends ComponentProps<'div'>,
    VariantProps<typeof cardHeaderVariants> {
  children: ReactNode;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, size, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cardHeaderVariants({ size, className })}
      {...props}
    >
      {children}
    </div>
  ),
);
Header.displayName = 'CardHeader';

// --------------------------------------

export interface TitleProps
  extends ComponentProps<'h3'>,
    VariantProps<typeof cardTitleVariants> {
  children: ReactNode;
}

const Title = forwardRef<HTMLParagraphElement, TitleProps>(
  ({ className, size, children, ...props }, ref) => (
    <h3 ref={ref} className={cardTitleVariants({ size, className })} {...props}>
      {children}
    </h3>
  ),
);
Title.displayName = 'CardTitle';

// --------------------------------------

export interface DescriptionProps
  extends ComponentProps<'p'>,
    VariantProps<typeof cardDescriptionVariants> {
  children: ReactNode;
}

const Description = forwardRef<HTMLParagraphElement, DescriptionProps>(
  ({ className, size, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cardDescriptionVariants({ size, className })}
      {...props}
    >
      {children}
    </p>
  ),
);
Description.displayName = 'CardDescription';

// --------------------------------------

export interface ContentProps
  extends ComponentProps<'div'>,
    VariantProps<typeof cardContentVariants> {
  children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ className, size, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cardContentVariants({ size, className })}
      {...props}
    >
      {children}
    </div>
  ),
);
Content.displayName = 'CardContent';

// --------------------------------------

export interface FooterProps
  extends ComponentProps<'div'>,
    VariantProps<typeof cardFooterVariants> {
  children: ReactNode;
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(
  ({ className, size, justify, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cardFooterVariants({ size, justify, className })}
      {...props}
    >
      {children}
    </div>
  ),
);
Footer.displayName = 'CardFooter';

// --------------------------------------

export const Card = {
  Body,
  Header,
  Content,
  Title,
  Description,
  Footer,
};
