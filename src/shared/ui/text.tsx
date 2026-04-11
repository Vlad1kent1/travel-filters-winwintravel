'use client'

import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'

const textVariants = cva('select-none !leading-[1.2]', {
	variants: {
		variant: {
			default: 'text-grey-500'
		},
		size: {
			// Headlines
			h1: 'text-[48px] font-normal',
			h2: 'text-[40px] font-medium',
			h3: 'text-[36px] font-medium',
			h4: 'text-[32px] font-medium',
			h5: 'text-[24px] font-medium',

			// Body texts
			body1: 'text-[24px] font-normal',
			body2: 'text-[20px] font-semibold',
			body3: 'text-[20px] font-medium',
			body4: 'text-[20px] font-normal',
			body5: 'text-[16px] font-medium',
			body6: 'text-[16px] font-normal',
			body7: 'text-[14px] font-normal',
			body8: 'text-[12px] font-normal',
			body9: 'text-[10px] font-normal'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'body6'
	}
})

interface TextProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof textVariants> {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span' | 'label' | 'div'
	htmlFor?: string
}

export const Text = ({
	className,
	variant,
	size,
	as: Component = 'p',
	htmlFor,
	...props
}: TextProps) => {
	return (
		<Component
			{...(Component === 'label' ? { htmlFor } : {})}
			className={cn(textVariants({ variant, size, className }))}
			{...props}
		/>
	)
}
