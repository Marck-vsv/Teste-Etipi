'use client';
import { ToasterProps, Toaster as ToasterProvider } from 'sonner';

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <ToasterProvider
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
    />
  );
};
