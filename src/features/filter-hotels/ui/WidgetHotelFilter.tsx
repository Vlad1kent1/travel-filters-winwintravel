'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '@/features/filter-hotels/model/store'
import { PopupConfirm } from '@/features/filter-hotels/ui/PopupConfirm'
import { PopupFilter } from '@/features/filter-hotels/ui/PopupFilter'
import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import { Button } from '@/shared/ui'

export const WidgetHotelFilter = () => {
	const { t } = useTranslation()
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)
	const [confirmMode, setConfirmMode] = useState<'apply' | 'clear' | null>(null)
	const [pendingFilters, setPendingFilters] = useState<SearchRequestFilter>([])
	const [filterInitial, setFilterInitial] = useState<
		SearchRequestFilter | undefined
	>(undefined)

	const { applyFilters } = useFilterStore()

	const openFilter = () => {
		setFilterInitial(undefined)
		setIsFilterOpen(true)
	}

	const handleApplyRequest = (filters: SearchRequestFilter) => {
		setPendingFilters(filters)
		setConfirmMode('apply')
		setIsFilterOpen(false)
		setIsConfirmOpen(true)
	}

	const handleClearRequest = (filters: SearchRequestFilter) => {
		setPendingFilters(filters)
		setConfirmMode('clear')
		setIsFilterOpen(false)
		setIsConfirmOpen(true)
	}

	const handleConfirm = () => {
		if (confirmMode === 'apply') {
			applyFilters(pendingFilters)
		} else if (confirmMode === 'clear') {
			applyFilters([])
		}

		setConfirmMode(null)
		setIsConfirmOpen(false)
	}

	const handleCancel = () => {
		setFilterInitial(pendingFilters)
		setConfirmMode(null)
		setIsConfirmOpen(false)
		if (confirmMode === 'clear') {
			setIsFilterOpen(true)
		}
	}

	return (
		<>
			<Button
				variant="primary"
				size="lg"
				onClick={openFilter}
			>
				{t('filters.addFilters')}
			</Button>

			<PopupFilter
				open={isFilterOpen}
				onOpenChange={setIsFilterOpen}
				initialFilters={filterInitial}
				onApplyRequest={handleApplyRequest}
				onClearRequest={handleClearRequest}
			/>

			<PopupConfirm
				isOpen={isConfirmOpen}
				onOpenChange={setIsConfirmOpen}
				title={
					confirmMode === 'clear'
						? t('filters.confirmClearTitle')
						: t('filters.confirmApplyTitle')
				}
				confirmLabel={
					confirmMode === 'clear'
						? t('filters.confirmClearLabel')
						: t('filters.confirmApplyLabel')
				}
				cancelLabel={
					confirmMode === 'clear'
						? t('filters.confirmClearCancel')
						: t('filters.confirmApplyCancel')
				}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</>
	)
}
