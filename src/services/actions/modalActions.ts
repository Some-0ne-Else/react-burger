export const TOGGLE_MODAL = 'TOGGLE_MODAL' as const;

interface ItoggleModal {
  readonly type: typeof TOGGLE_MODAL
}

export type TModalActions = ItoggleModal

export const toggleModal = ():TModalActions => ({
  type: TOGGLE_MODAL,
});
