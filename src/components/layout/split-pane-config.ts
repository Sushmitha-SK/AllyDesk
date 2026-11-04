export const LIST_WIDTH_COOKIE = "sf_list_width";
export const LIST_WIDTH_MIN = 280;
export const LIST_WIDTH_MAX = 560;
export const LIST_WIDTH_DEFAULT = 360;
export const LIST_WIDTH_STEP = 16;

export function clampListWidth(px: number) {
    return Math.min(LIST_WIDTH_MAX, Math.max(LIST_WIDTH_MIN, Math.round(px)));
}

export function parseListWidth(value: string | undefined) {
    const n = Number(value);
    return value && Number.isFinite(n) ? clampListWidth(n) : LIST_WIDTH_DEFAULT;
}