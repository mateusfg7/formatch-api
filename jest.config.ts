import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1',
  },
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
  detectOpenHandles: true,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../docs/coverage',
  coverageReporters: ['html-spa', 'text-summary'],
}

export default config
