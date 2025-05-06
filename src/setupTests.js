import '@testing-library/jest-dom' // jest-dom importado globalmente e funcionara em todos os testes


/* 
// * mockando fetch globalmente para evitar chamadas a api

import { vi } from 'vitest'

global.fetch = vi.fn((url) => {
    if (url === '/api/sabores') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ sabores: ['Carne', 'Frango'] }),
      })
    }  
    return Promise.reject(new Error(`URL não mockada: ${url}`))
  })
*/