import rollupVue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';

export default {
    input: './www/js/main.js',
    output: [
        {
            file: './www/js/bundle.js',
            format: 'iife',
        },
    ],
    plugins: [
        rollupVue(),
        resolve(),
        commonJS({
            include: 'node_modules/**'
        })
    ]
};