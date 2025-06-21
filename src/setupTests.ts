import '@testing-library/jest-dom';

// Mock Math.random for consistent testing
const mockMath = Object.create(global.Math);
mockMath.random = jest.fn(() => 0.5); // Always return 0.5 to avoid random errors
global.Math = mockMath;

// Mock setTimeout for consistent delays in tests
jest.mock('timers');