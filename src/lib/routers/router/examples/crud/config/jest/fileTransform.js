"use strict";

import path from 'path';

module.exports = {
  process(src, filename) {
    // Takes the full file path and returns just the filename as a JS module string
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  }
};
