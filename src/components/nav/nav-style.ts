/**
 * Shared geometry for the global nav, derived from the Figma frames.
 *
 * The design is drawn at 1920px: 120px side gutters, 80px between the logo and
 * the menu, 40px between menu items, 80px between mega-panel columns. Those all
 * scale with the viewport so the header still fits at the xl breakpoint, and
 * land exactly on the Figma numbers at 1920 (120/1920 = 6.25vw, 80 = 4.1667vw,
 * 40 = 2.0833vw).
 */

/** Side gutter shared by the nav row and the mega panel. */
export const NAV_INSET = 'px-6 md:px-10 xl:px-[clamp(2rem,6.25vw,120px)]'

/** Logo → menu list. Figma: 80px. */
export const NAV_LOGO_GAP = 'gap-[clamp(1.5rem,4.1667vw,80px)]'

/** Between top-level menu items. Figma: 40px. */
export const NAV_ITEM_GAP = 'gap-[clamp(0.75rem,2.0833vw,40px)]'

/** Between mega-panel columns. Figma: 80px. */
export const NAV_COLUMN_GAP = 'gap-[clamp(2rem,4.1667vw,80px)]'

/** Figma column width; columns shrink below this when the viewport is narrow. */
export const NAV_COLUMN_MAX = 473

/**
 * Closed header height: 10px top padding + 48px row + 11px below (Figma frame
 * 124:1217 is a fixed 69px with 10/8 padding). The mega panel's own top padding
 * makes up the remainder of the design's 40px row→content gap.
 */
export const NAV_BAR_HEIGHT = 69
export const NAV_PANEL_TOP_PAD = 29
