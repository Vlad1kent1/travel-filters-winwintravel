'use client'

import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'

const buttonVariants = cva(
	'inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-[16px] transition-all outline-none select-none font-semibold text-[16px] disabled:pointer-events-none active:translate-y-[1px]',
	{
		variants: {
			variant: {
				primary: `
          bg-[var(--brand-200)] text-white
          hover:bg-[var(--brand-100)]
          active:bg-[var(--brand-300)]
          disabled:bg-[var(--grey-100)] disabled:text-[var(--grey-300)]
        `,
				outlinePrimary: `
          border border-[var(--brand-200)] text-[var(--brand-200)]
          hover:border-[var(--brand-300)] hover:text-[var(--brand-300)]
          active:bg-[var(--brand-200)] active:text-white
          disabled:border-[var(--grey-300)] disabled:text-[var(--grey-300)] disabled:bg-[var(--grey-100)]
        `,
				outline: `
          border border-[var(--grey-200)] text-[var(--grey-500)]
          hover:bg-[var(--grey-100)]
          active:border-[var(--brand-300)] active:text-[var(--brand-300)]
          disabled:text-[var(--grey-200)] disabled:border-[var(--grey-200)] disabled:bg-[var(--grey-100)]
        `,
				ghost: `
          text-[var(--grey-500)]
          hover:bg-[var(--grey-100)]
          active:bg-[var(--grey-500)] active:text-white
          disabled:bg-[var(--grey-200)] disabled:text-[var(--grey-400)]
        `,
				icon: `
          text-[var(--grey-500)]
          hover:text-[var(--brand-200)]
          active:text-[var(--brand-300)]
          disabled:text-[var(--grey-300)]
        `,
				link: `
          underline underline-offset-2
          bg-transparent p-0 h-auto
          text-[var(--primary-100)]
          hover:text-[var(--grey-300)]
          active:text-[var(--grey-500)]
        `
			},

			size: {
				lg: 'h-[64px] px-8 max-xs:h-[48px]',
				md: 'h-[48px] px-6',
				sm: 'h-[40px] px-4'
			},

			text: {
				xl: 'text-[36px] font-semibold',
				lg: 'text-[24px] font-semibold',
				default: 'text-[16px] font-semibold',
				'link-lg': 'text-[20px] font-medium',
				'link-md': 'text-[16px] font-medium',
				'link-sm': 'text-[14px] font-medium',
				icon: 'p-0 aspect-square'
			}
		},

		defaultVariants: {
			variant: 'primary',
			size: 'md',
			text: 'default'
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	loading?: boolean
}

const Button = ({
	className,
	variant,
	size,
	text,
	loading,
	children,
	...props
}: ButtonProps) => (
	<button
		className={cn(buttonVariants({ variant, size, text }), className)}
		{...props}
	>
		{loading && (
			<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
		)}
		{children}
	</button>
)

export { Button }
