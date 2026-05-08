import { create } from 'zustand'

/**
 * Modal Store — manages global modal visibility state
 */
const useModalStore = create((set) => ({
  isLoginModalOpen: false,

  /** Opens the login modal */
  openLoginModal: () => set({ isLoginModalOpen: true }),

  /** Closes the login modal */
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}))

export default useModalStore