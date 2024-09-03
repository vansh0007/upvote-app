export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '^.+\\.svg$': 'jest-transformer-svg',
      },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    
    transform: {
        "^.+\\.(ts|tsx)$": ['ts-jest', {
          tsconfig: 'tsconfig.app.json' // Specify your tsconfig file here if needed
        }]
      }
    };