export type Screen = "home" | "login" | "shop";

export type ScreenChange = (screen: Screen) => void;
