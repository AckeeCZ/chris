module.exports = {
    presets: ['@babel/typescript', '@babel/env', '@babel/react'],
    plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread'],
    ignore: ['**/__tests__/'],
};
