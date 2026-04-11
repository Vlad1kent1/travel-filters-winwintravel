import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

interface FilterStore {
	savedFilters: SearchRequestFilter
	applyFilters: (newFilters: SearchRequestFilter) => void
	clearFilters: () => void
}

export const useFilterStore = create<FilterStore>()(
	persist(
		set => ({
			savedFilters: [],
			applyFilters: newFilters => set({ savedFilters: newFilters }),
			clearFilters: () => set({ savedFilters: [] })
		}),
		{
			name: 'hotel-filters-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
