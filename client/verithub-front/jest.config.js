module.exports = {
    "roots": [
      "<rootDir>",
    ],
    "modulePaths": [
      "<rootDir>/src/",
    ],
    "moduleDirectories": [
      "node_modules"
    ],
    "moduleNameMapper": {
      "#(.*)": "<rootDir>/node_modules/$1"
    },
    "collectCoverage": true,
     "coverageReporters": ["json", "html"],

};
