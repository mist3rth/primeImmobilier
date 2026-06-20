/**
 * Utilitaire de journalisation exclusif au développement
 */
export const log = {
  dev: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development' || import.meta.env.DEV) {
      console.log('[DEV_LOG]', ...args);
    }
  },
  error: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development' || import.meta.env.DEV) {
      console.error('[DEV_ERROR]', ...args);
    }
  }
};
