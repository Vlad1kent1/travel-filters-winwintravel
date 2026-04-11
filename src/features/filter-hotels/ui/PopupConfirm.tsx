'use client'

import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import { cn } from '@/shared/lib/utils'
import {
	Button,
	Popup,
	PopupContent,
	PopupFooter,
	PopupHeader,
	PopupTitle
} from '@/shared/ui'

interface PopupConfirmProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	title: string
	confirmLabel: string
	cancelLabel: string
	onConfirm: () => void
	onCancel: () => void
}

export const PopupConfirm = ({
	isOpen,
	onOpenChange,
	title,
	confirmLabel,
	cancelLabel,
	onConfirm,
	onCancel
}: PopupConfirmProps) => {
	const isMobileSmall = useMediaQuery('(max-width: 375px)')

	return (
		<Popup
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<PopupContent>
				<PopupHeader className="shrink-0">
					<PopupTitle className="text-center">{title}</PopupTitle>
				</PopupHeader>

				<PopupFooter
					className={cn(
						'shrink-0 pt-30',
						'flex gap-4 flex-wrap',
						isMobileSmall ? 'flex-col' : 'flex-row'
					)}
				>
					<Button
						variant="outline"
						className={isMobileSmall ? 'w-full' : 'w-[280px]'}
						onClick={onCancel}
					>
						{cancelLabel}
					</Button>

					<Button
						variant="primary"
						className={isMobileSmall ? 'w-full' : 'w-[280px]'}
						onClick={onConfirm}
					>
						{confirmLabel}
					</Button>
				</PopupFooter>
			</PopupContent>
		</Popup>
	)
}
