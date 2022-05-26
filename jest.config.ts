import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

// Or async function
export default async (): Promise<InitialOptionsTsJest> => {
  return {
    preset: 'ts-jest/presets/default-esm',
    verbose: true,
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
  };
};
