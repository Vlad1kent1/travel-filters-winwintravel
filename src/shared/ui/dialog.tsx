'use client'

import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { XIcon } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'

import { cn } from '@/shared/lib/utils'
import { Button, Text } from '@/shared/ui'

const Dialog = ({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) => (
	<DialogPrimitive.Root
		data-slot="dialog"
		{...props}
	/>
)

const DialogPortal = ({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) => (
	<DialogPrimitive.Portal
		data-slot="dialog-portal"
		{...props}
	/>
)

const DialogOverlay = ({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) => (
	<DialogPrimitive.Overlay
		data-slot="dialog-overlay"
		className={cn(
			'fixed inset-0 z-50 bg-black/30 backdrop-blur-sm',
			'overflow-y-auto grid justify-items-center',
			'content-start',
			'py-[80px] px-[40px]',
			'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
			className
		)}
		{...props}
	/>
)

const DialogContent = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) => (
	<DialogPortal>
		<DialogOverlay>
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					'relative z-50 w-full max-w-[1280px]',
					'rounded-[16px] bg-white p-[32px] shadow-lg duration-200 outline-none',
					'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
					className
				)}
				{...props}
			>
				{children}
			</DialogPrimitive.Content>
		</DialogOverlay>
	</DialogPortal>
)

const DialogHeader = ({
	className,
	children,
	showCloseButton = true,
	...props
}: React.ComponentProps<'div'> & { showCloseButton?: boolean }) => {
	const { t } = useTranslation()

	return (
		<div
			data-slot="dialog-header"
			className={cn(
				'relative flex flex-col gap-6 text-center pr-[40px] pl-[40px]',
				className
			)}
			{...props}
		>
			{children}
			{showCloseButton && (
				<DialogPrimitive.Close asChild>
					<Button
						variant="icon"
						className="absolute right-0 top-[4px] size-10 p-0 flex items-center justify-center"
					>
						<XIcon className="size-6" />
						<span className="sr-only">{t('common.close')}</span>
					</Button>
				</DialogPrimitive.Close>
			)}
		</div>
	)
}

const DialogTitle = ({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) => (
	<DialogPrimitive.Title
		asChild
		data-slot="dialog-title"
		className={cn(className)}
		{...props}
	>
		<Text size="h2">{props.children}</Text>
	</DialogPrimitive.Title>
)

const DialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		data-slot="dialog-footer"
		className={cn('flex flex-row justify-center gap-4 mt-8', className)}
		{...props}
	/>
)

export {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle
}
