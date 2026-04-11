'use client'

import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'
import { CheckIcon } from 'lucide-react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'

import { cn } from '@/shared/lib/utils'

const checkboxVariants = cva(
	'peer cursor-pointer size-5 shrink-0 transition-all outline-none border flex items-center justify-center disabled:cursor-not-allowed',
	{
		variants: {
			variant: {
				default:
					'rounded-[4px] border-[2px] border-[var(--grey-500)] data-[state=checked]:bg-[var(--grey-500)] data-[state=checked]:text-white',
				circle:
					'rounded-full border-[2px] border-[var(--grey-500)] data-[state=checked]:bg-[var(--grey-500)] data-[state=checked]:text-white'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
)

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
		VariantProps<typeof checkboxVariants>
>(({ className, variant, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			checkboxVariants({ variant, className }),
			'disabled:border-[var(--grey-200)] disabled:data-[state=checked]:bg-[var(--grey-200)]'
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
			<CheckIcon className="size-3.5 stroke-[3px]" />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
))

Checkbox.displayName = 'Checkbox'

export { Checkbox }
