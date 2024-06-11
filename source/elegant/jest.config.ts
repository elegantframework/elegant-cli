import type { Config } from 'jest';
import nextJest from 'next/jest.js';
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/utils/mocks/prisma-singleton.ts'],
  moduleNameMapper: {
		'@/auth': '<rootDir>/src/utils/mocks/auth.ts',
		'next-auth/providers/credentials':
			'<rootDir>/src/utils/mocks/next-auth-providers-credentials.ts',
		'next-auth': '<rootDir>/src/utils/mocks/next-auth.ts',
	},
};
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);