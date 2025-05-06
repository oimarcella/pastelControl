import '@testing-library/jest-dom' // jest-dom importado globalmente e funcionara em todos os testes

beforeAll(() => {
  vi.spyOn(window, "alert").mockImplementation(() => {});
});


const emitMock = vi.fn();
const onMock = vi.fn();

vi.mock('socket.io-client', () => {
  return {
      io: () => ({
          emit: emitMock,
          on: onMock,
      })
  };
});

export { emitMock, onMock };

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