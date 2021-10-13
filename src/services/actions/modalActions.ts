export const TOGGLE_MODAL = 'TOGGLE_MODAL' as const;

interface ItoggleModal{
  readonly type: typeof TOGGLE_MODAL
}

export const toggleModal = ():ItoggleModal => ({
  type: TOGGLE_MODAL,
});
