'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterType } from '@/shared/api/types/Filter'
import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import { cn } from '@/shared/lib/utils'
import filterData from '@/shared/temp/filterData.json'
import {
	Button,
	Checkbox,
	Popup,
	PopupContent,
	PopupFooter,
	PopupHeader,
	PopupTitle,
	Separator,
	Text
} from '@/shared/ui'

import { useFilterStore } from '../model/store'

interface PopupFilterProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	initialFilters?: SearchRequestFilter
	onApplyRequest?: (filters: SearchRequestFilter) => void
	onClearRequest?: (filters: SearchRequestFilter) => void
}

export const PopupFilter = ({
	open,
	onOpenChange,
	initialFilters,
	onApplyRequest,
	onClearRequest
}: PopupFilterProps) => {
	const { t } = useTranslation()
	const { savedFilters, applyFilters } = useFilterStore()
	const [localFilters, setLocalFilters] = useState<SearchRequestFilter>([])
	const isMobileSmall = useMediaQuery('(max-width: 375px)')

	useEffect(() => {
		if (open) {
			setLocalFilters(initialFilters ?? savedFilters)
		}
	}, [open, savedFilters, initialFilters])

	const handleCheckboxChange = (
		filterId: string,
		optionId: string,
		checked: boolean
	) => {
		setLocalFilters(prev => {
			const existing = prev.find(item => item.id === filterId)
			if (existing) {
				const optionsIds = checked
					? [...existing.optionsIds, optionId]
					: existing.optionsIds.filter(id => id !== optionId)

				const updated = prev.map(item =>
					item.id === filterId ? { ...item, optionsIds } : item
				)

				return updated.filter(item => item.optionsIds.length > 0)
			}

			if (checked) {
				return [
					...prev,
					{ id: filterId, type: FilterType.OPTION, optionsIds: [optionId] }
				]
			}

			return prev
		})
	}

	const isChecked = (filterId: string, optionId: string) => {
		return localFilters.some(
			item => item.id === filterId && item.optionsIds.includes(optionId)
		)
	}

	const handleClearAll = () => {
		if (onClearRequest) {
			onClearRequest(localFilters)
			return
		}

		setLocalFilters([])
	}

	const handleApply = () => {
		if (onApplyRequest) {
			onApplyRequest(localFilters)
			return
		}

		const confirmed = window.confirm('Apply selected filters?')
		if (!confirmed) {
			return
		}

		applyFilters(localFilters)
		onOpenChange(false)
	}

	return (
		<Popup
			open={open}
			onOpenChange={onOpenChange}
		>
			<PopupContent className="flex flex-col h-full xs:h-auto">
				<PopupHeader className="shrink-0">
					<PopupTitle>{t('filters.title')}</PopupTitle>
				</PopupHeader>

				<div
					className={cn(
						'flex-1 overflow-y-auto px-1',
						'xs:overflow-visible xs:h-auto'
					)}
				>
					<div className="">
						{filterData.filterItems.map((filter, index) => (
							<div key={filter.id}>
								{index >= 0 && <Separator className="my-6 xs:my-8" />}
								<Text
									size={isMobileSmall ? 'body3' : 'h5'}
									className="mb-4 xs:mb-6"
								>
									{filter.name}
								</Text>

								<div className="grid max-xs:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
									{filter.options.map(option => (
										<label
											key={option.id}
											className="flex items-center gap-3 cursor-pointer"
										>
											<Checkbox
												checked={isChecked(filter.id, option.id)}
												onCheckedChange={checked =>
													handleCheckboxChange(
														filter.id,
														option.id,
														checked as boolean
													)
												}
											/>
											<Text
												as="span"
												size="body6"
											>
												{option.name}
											</Text>
										</label>
									))}
								</div>
							</div>
						))}
					</div>
					<Separator className="my-8 max-xs:hidden " />
				</div>

				<PopupFooter
					className={cn(
						'shrink-0 max-xs:pt-4 mt-auto flex flex-col gap-4',
						'md:flex-row md:items-center md:justify-center md:relative'
					)}
				>
					<Button
						variant="link"
						text="link-md"
						onClick={handleClearAll}
						className={cn(
							'mx-auto md:mx-0 order-1',
							'md:absolute md:right-0 md:order-2'
						)}
					>
						{t('filters.clearAllParameters')}
					</Button>

					<Button
						variant="primary"
						size="md"
						className={cn('w-full order-2', 'md:w-[200px] md:order-1')}
						onClick={handleApply}
					>
						{t('filters.apply')}
					</Button>
				</PopupFooter>
			</PopupContent>
		</Popup>
	)
}
