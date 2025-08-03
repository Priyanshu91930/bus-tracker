// Asset configuration for web compatibility
export const getAssetPath = (assetName) => {
  // For web, we need to handle assets differently
  if (typeof window !== 'undefined') {
    // Web environment
    return `/assets/images/${assetName}`;
  }
  // Native environment
  return require(`../../assets/images/${assetName}`);
};

// Safe asset loading
export const safeRequire = (path) => {
  try {
    return require(path);
  } catch (error) {
    console.warn(`Failed to load asset: ${path}`, error);
    return null;
  }
};

// Asset mapping for different platforms
export const ASSETS = {
  clg: {
    web: '/assets/images/clg.png',
    native: () => require('../../assets/images/clg.png')
  },
  bus: {
    web: '/assets/images/pngfind.com-bus-image-png-6424101.png',
    native: () => require('../../assets/images/pngfind.com-bus-image-png-6424101.png')
  },
  google: {
    web: '/assets/images/goggle.png',
    native: () => require('../../assets/images/goggle.png')
  }
}; 