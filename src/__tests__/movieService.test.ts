import { testData } from '../ts/services/__mocks__/movieService';
import * as movieService from '../ts/services/movieService';

jest.mock('axios', () => ({
  get: async (url: string) => {
    return new Promise((resolve, reject) => {
      if (url.endsWith('error')) {
        reject('error');
      } else {
        resolve({ data: { Search: testData } });
      }
    });
  },
}));

test('should generate error message', async () => {
  try {
    await movieService.getData('error');
  } catch (error: any) {
    expect(error.length).toBe(0);
    expect(testData.length).toBe(0);
    expect(testData[0].Title).not.toBe('Inception');
  }
});

test('should get test data', async () => {
  await movieService.getData('text');

  expect(testData.length).toBe(3);
  expect(testData[0].Title).toBe('Inception');
  expect(testData).not.toBe(null);
});