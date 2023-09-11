import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
    ...createJestConfig,
    compilerOptions: {
        baseUrl: '.',
        paths: {
          '@components/*': ['./src/components/*'],
          '@pages/*': ['./src/pages/*'],
          '@styles/*': ['./src/styles/*'],
          '@utils/*': ['./src/utils/*'],
          '@src/*': ['./src/*'],
        },
    },
  testEnvironment: 'jest-environment-jsdom',
}

 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)