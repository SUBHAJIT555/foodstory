/** Observed: location tabs use `duration-300`. Mega/drawer timing was not filmed. */
export const durationUi = 0.3;

export const overlayPresence = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: durationUi, ease: "easeOut" as const },
};

export const panelPresence = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: durationUi, ease: "easeOut" as const },
};

export const drawerPresence = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: durationUi, ease: "easeOut" as const },
};
