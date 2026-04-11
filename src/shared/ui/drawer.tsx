'use client'

import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { XIcon } from 'lucide-react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { cn } from '@/shared/lib/utils'
import { Button, Text } from '@/shared/ui'

const Drawer = ({
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
	<DrawerPrimitive.Root
		data-slot="drawer"
		{...props}
	/>
)

const DrawerPortal = ({
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) => (
	<DrawerPrimitive.Portal
		data-slot="drawer-portal"
		{...props}
	/>
)

const DrawerOverlay = ({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) => (
	<DrawerPrimitive.Overlay
		data-slot="drawer-overlay"
		className={cn('fixed inset-0 z-50 bg-black/30 backdrop-blur-sm', className)}
		{...props}
	/>
)

const DrawerContent = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) => (
	<DrawerPortal>
		<DrawerOverlay />
		<DrawerPrimitive.Content
			data-slot="drawer-content"
			className={cn(
				'fixed inset-x-0 top-[32px] bottom-0 z-50 flex h-auto flex-col border-none bg-white outline-none',
				'rounded-t-[16px]',
				'pt-[20px] px-[20px] pb-[80px]',
				className
			)}
			{...props}
		>
			{children}
		</DrawerPrimitive.Content>
	</DrawerPortal>
)

const DrawerHeader = ({
	className,
	children,
	showCloseButton = true,
	...props
}: React.ComponentProps<'div'> & { showCloseButton?: boolean }) => {
	const { t } = useTranslation()

	return (
		<div
			data-slot="drawer-header"
			className={cn(
				'relative flex flex-col gap-6 text-center px-[32px]',
				className
			)}
			{...props}
		>
			{children}

			{showCloseButton && (
				<DrawerPrimitive.Close asChild>
					<Button
						variant="icon"
						className="absolute right-0 top-0 size-6 p-0 flex items-center justify-center"
					>
						<XIcon className="size-4" />
						<span className="sr-only">{t('common.close')}</span>
					</Button>
				</DrawerPrimitive.Close>
			)}
		</div>
	)
}

const DrawerTitle = ({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) => (
	<DrawerPrimitive.Title
		asChild
		data-slot="drawer-title"
		className={cn(className)}
		{...props}
	>
		<Text size="body3">{props.children}</Text>
	</DrawerPrimitive.Title>
)

const DrawerFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		data-slot="drawer-footer"
		className={cn('flex flex-col gap-4 pt-8 mt-auto', className)}
		{...props}
	/>
)

export {
	Drawer,
	DrawerPortal,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle
}
