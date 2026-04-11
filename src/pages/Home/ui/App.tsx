import { useFilterStore } from '@/features/filter-hotels/model/store'
import { WidgetHotelFilter } from '@/features/filter-hotels/ui/WidgetHotelFilter'

export const App = () => {
	const { savedFilters } = useFilterStore()

	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center gap-6 p-4">
			<WidgetHotelFilter />

			<pre className="w-full max-w-4xl overflow-x-auto rounded-xl bg-slate-950/5 p-4 text-sm text-slate-900">
				{JSON.stringify(savedFilters, null, 2)}
			</pre>
		</section>
	)
}
