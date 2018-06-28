module.exports = {
  "presets": [
    ["env", {
      "modules": false
    }],
    "stage-2"
  ],
  "plugins": [
    "transform-runtime",
    ["component", [
      { "libraryName": "mint-ui", "style": true },
      { "libraryName": "vux", "style": true }
    ]]
  ],
  "env": {
    "test": {
      "presets": ["env", "stage-2"]
    }
  }
}
