import { getAverageRGB } from './color';
import  'jest-canvas-mock'
describe('getAverageRGB', () => {

  // Test case 1: Test with a valid image
  test('should return the average RGB values of the image', () => {
    // Create a mock image element
    const image = document.createElement('img');
    image.src = 'path/to/image.jpg';
    image.width = 100;
    image.height = 100;

    // Call the getAverageRGB function
    const result = getAverageRGB(image);

    // Assert the expected RGB values
    expect(result).toEqual({ r: 0, g: 0, b: 0 }); // Replace with the expected RGB values
  });

  // Test case 2: Test with a non-supporting environment
  test('should return default RGB values for non-supporting environments', () => {
    // Create a mock image element
    const image = document.createElement('img');
    image.src = 'path/to/image.jpg';
    image.width = 100;
    image.height = 100;

    // Mock the getContext method to simulate a non-supporting environment
    const getContextMock = jest.fn().mockReturnValue(null);
    document.createElement = jest.fn().mockReturnValue({
      getContext: getContextMock,
    });

    // Call the getAverageRGB function
    const result = getAverageRGB(image);

    // Assert the expected default RGB values
    expect(result).toEqual({ r: 0, g: 0, b: 0 }); // Replace with the expected default RGB values
  });

  // Test case 3: Test with an image on a different domain
  test('should return default RGB values for images on a different domain', () => {
    // Create a mock image element
    const image = document.createElement('img');
    image.src = 'https://example.com/image.jpg';
    image.width = 100;
    image.height = 100;

    // Call the getAverageRGB function
    const result = getAverageRGB(image);

    // Assert the expected default RGB values
    expect(result).toEqual({ r: 0, g: 0, b: 0 }); // Replace with the expected default RGB values
  });
});