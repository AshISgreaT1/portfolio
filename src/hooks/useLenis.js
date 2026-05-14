import { useContext } from 'react';
import { LenisContext } from '../context/lenisContext.js';

export function useLenis() {
  return useContext(LenisContext);
}
