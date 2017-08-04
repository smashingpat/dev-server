module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: "airbnb",
    parser: "babel-eslint",
    rules: {
        "indent": [2, 4],
        "react/jsx-indent": [2, 4],
        "import/prefer-default-export": "off",
    },
};
