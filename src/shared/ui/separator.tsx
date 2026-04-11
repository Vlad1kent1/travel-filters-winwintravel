import * as React from 'react'

import { Separator as SeparatorPrimitive } from 'radix-ui'

import { cn } from '@/shared/lib/utils'

const Separator = ({
	className,
	orientation = 'horizontal',
	decorative = true,
	...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) => (
	<SeparatorPrimitive.Root
		data-slot="separator"
		decorative={decorative}
		orientation={orientation}
		className={cn(
			'shrink-0 bg-grey-200 data-horizontal:h-[2px] data-horizontal:w-full data-vertical:w-[2px] data-vertical:self-stretch',
			className
		)}
		{...props}
	/>
)

export { Separator }
