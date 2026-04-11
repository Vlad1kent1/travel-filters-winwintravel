# WinWinTravel

## Task

Technical test task for **WinWinTravel**. This project implements a high-fidelity, responsive hotel filtering system based on a provided Figma design and JSON API data.

## What was done

I created button with logic of adding filters `WidgetHotelFilter` and modals `PopupFilter` and `PopupConfirm`. The app starts by fetching filter options and displaying them in a modal window when the user clicks the "Add filters" button. If the user has already selected some filters, the app remembers them and pre-fills the checkboxes automatically in `PopupFilter`.

When the user finishes picking filters and clicks "Apply" or "Clear all," the app doesn't just save them immediately. Instead, it closes `PopupFilter` modal and shows `PopupConfirm` modal to make sure that the user didn't click it by mistake. Once the user confirms, the data is saved to a global store that keeps their choices safe even if the user refreshes the page or close browser. The user can always see the current state of the user's filters in a dedicated JSON preview on the homepage.

To ensure a great experience on any device, I made the system adaptive: on a computer, the user see a classic popup in the middle of the screen, but on a phone, it transforms into a convenient "bottom sheet" that slides up from the bottom. This works thanks to the `useMediaQuery` hook and all the logic is described in the component in `shared\ui\popup.tsx`.

## Core technologies

- **React 19 & TypeScript**: For type-safe, modern component development.
- **Zustand**: Chosen for global state management due to its lightweight nature and excellent support for `persist` middleware (Session/Local Storage).
- **Tailwind CSS**: Used for rapid, mobile-first styling.
- **React Query**: For efficient data fetching and caching of `filterData.json`.
- **i18next**: Configured for internationalization (as per project requirements).

## Additional technologies added

- **[shadcn/ui](https://ui.shadcn.com/)**:
  - **Why?** It provides high-quality, accessible (Radix UI-based) primitive components. Instead of "reinventing the wheel" for Checkboxes and Modals, I used shadcn to ensure WAI-ARIA compliance while maintaining full control over the styling to match the Figma design exactly.
- **[Vaul](https://github.com/emilkowalski/vaul)**:
  - **Why?** Specifically added to handle the Mobile Drawer (Bottom Sheet) experience, which offers a superior native-like feel on mobile devices compared to standard centered dialogs. It is automatically installed with shadcn/ui drawer.
- **[Lucide React](https://lucide.dev/)**: For consistent, lightweight iconography. It is automatically installed with shadcn/ui.

## Architecture

### 1. **Feature-Sliced Design (FSD)**

The project follows **FSD** methodology:

- **`shared`**: UI (Buttons, Text, Checkbox via shadcn), hooks (`useMediaQuery`), and API types.
- **`features/filter-hotels`**: Contains the "Smart" logic.
  - `model/`: Zustand store (`useFilterStore`).
  - `ui/`: Components (`HotelFilterFlow`, `PopupConfirm`, `PopupFilter`)
- **`pages`**: The composition layer (Homepage).

### 2. **Adaptive Popups (Dialog vs Drawer)**

Instead of a simple modal, I built a responsive system that adapts to the screen size:

- **On Desktop:** It shows a centered Dialog with a clean layout and consistent 32px padding.
- **On Mobile (up to 375px):** It automatically switches to a Bottom Drawer.
  I chose this because a "bottom sheet" is much more natural for mobile users and feels like a native app. This logic is handled by a custom useMediaQuery hook and a shared Popup wrapper.

## Project structure

```text
src/
├── pages/            # Homepage & JSON Debug view
├── features/         # Business logic: filter-hotels
│   └── filter-hotels/
│       ├── model/    # Zustand Store (Persistence)
│       └── ui/       # Chained Popups & Logic
├── shared/           # Atomic UI (shadcn/ui), API types, & Utils
```

## How to set up the project

All scripts described below (except for _**dependency installation**_) can be used with pnpm instead of npm. They work the same way

### Installing dependencies

After downloading the project's source code, you need to install the dependencies. To do this, you can use the following command:

```shell
pnpm i
# or
pnpm install
```

### Run

To start the project for development, use the script `dev`:

```shell
npm run dev
```

This script automatically refreshes the page after you make changes in the code and works quickly with `vite`.

### Build

To compile the project, use the script `build`:

```shell
npm run build
```

After executing this script, you will have a folder `dist` in which the project's output files will be located, which can be uploaded to hosting.

Also, to see how the compiled version of the program looks, you can use the script `preview`.

```shell
npm run preview
```
