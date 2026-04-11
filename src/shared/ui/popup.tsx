'use client'

import * as React from 'react'

import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerPortal,
	DrawerTitle
} from '@/shared/ui'

const PopupContext = React.createContext<{ isDesktop: boolean }>({
	isDesktop: true
})

const Popup = ({ children, ...props }: React.ComponentProps<typeof Dialog>) => {
	const isDesktop = useMediaQuery('(min-width: 376px)')

	const Root = isDesktop ? Dialog : Drawer

	return (
		<PopupContext.Provider value={{ isDesktop }}>
			<Root {...props}>{children}</Root>
		</PopupContext.Provider>
	)
}

const PopupPortal = (props: React.ComponentProps<typeof DialogPortal>) => {
	const { isDesktop } = React.useContext(PopupContext)
	const Portal = isDesktop ? DialogPortal : DrawerPortal
	return <Portal {...props} />
}

const PopupOverlay = (props: React.ComponentProps<typeof DialogOverlay>) => {
	const { isDesktop } = React.useContext(PopupContext)
	const Overlay = isDesktop ? DialogOverlay : DrawerOverlay
	return <Overlay {...props} />
}

const PopupContent = (props: React.ComponentProps<typeof DialogContent>) => {
	const { isDesktop } = React.useContext(PopupContext)
	const Content = isDesktop ? DialogContent : DrawerContent
	return <Content {...props} />
}

const PopupHeader = (props: React.ComponentProps<typeof DialogHeader>) => {
	const { isDesktop } = React.useContext(PopupContext)
	const Header = isDesktop ? DialogHeader : DrawerHeader
	return <Header {...props} />
}

const PopupTitle = (props: React.ComponentProps<typeof DialogTitle>) => {
	const { isDesktop } = React.useContext(PopupContext)
	const Title = isDesktop ? DialogTitle : DrawerTitle
	return <Title {...props} />
}

const PopupFooter = (props: React.ComponentProps<typeof DialogFooter>) => {
	const { isDesktop } = React.useContext(PopupContext)
	const Footer = isDesktop ? DialogFooter : DrawerFooter
	return <Footer {...props} />
}

export {
	Popup,
	PopupContent,
	PopupHeader,
	PopupFooter,
	PopupOverlay,
	PopupPortal,
	PopupTitle
}
