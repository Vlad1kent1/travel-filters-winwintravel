'use client'

import * as React from 'react'

import { CheckIcon } from 'lucide-react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'

import { cn } from '@/shared/lib/utils'
import { Text } from '@/shared/ui'

interface RadioButtonProps
	extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
	label: string
}

const RadioButton = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	RadioButtonProps
>(({ className, label, id, disabled, ...props }, ref) => {
	const generatedId = React.useId()
	const checkboxId = id || generatedId

	return (
		<label
			htmlFor={checkboxId}
			className={cn(
				'group relative flex cursor-pointer items-center gap-3 p-[20px] rounded-[16px] border transition-all select-none',
				'border-[var(--grey-200)] bg-white hover:bg-[var(--grey-100)]',
				'has-[[data-state=checked]]:bg-[var(--grey-500)] has-[[data-state=checked]]:border-[var(--grey-500)]',
				disabled &&
					'cursor-not-allowed bg-[var(--grey-200)] hover:bg-[var(--grey-200)] border-[var(--grey-200)]',
				className
			)}
		>
			<CheckboxPrimitive.Root
				ref={ref}
				id={checkboxId}
				disabled={disabled}
				className={cn(
					'size-5 shrink-0 rounded-[4px] border flex items-center justify-center transition-colors',
					'border-2 border-[var(--grey-500)] group-has-[[data-state=checked]]:border-white group-has-[[data-state=checked]]:text-[var(--grey-500)] group-has-[[data-state=checked]]:bg-white',
					disabled && 'border-[var(--grey-400)]'
				)}
				{...props}
			>
				<CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
					<CheckIcon className="size-3.5 stroke-[4px]" />
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>

			<Text
				size="body4"
				className={cn(
					'transition-colors font-medium',
					'text-[var(--grey-500)]',
					'group-has-[[data-state=checked]]:text-white',
					disabled && 'text-[var(--grey-400)]'
				)}
			>
				{label}
			</Text>
		</label>
	)
})

RadioButton.displayName = 'RadioButton'

export { RadioButton }
