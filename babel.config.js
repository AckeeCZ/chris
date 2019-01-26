module.exports = function(api) {
    const plugins = ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread'];

    const presets = {
        lib: ['@babel/typescript', '@babel/env', '@babel/react'],
        es: [
            '@babel/typescript',
            [
                '@babel/env',
                {
                    modules: false,
                },
            ],
            '@babel/react',
        ],
    };

    return {
        plugins,
        presets: presets[api.env()],
        ignore: ['**/__tests__/'],
    };
};
