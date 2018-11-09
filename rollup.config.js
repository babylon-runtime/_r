import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json'

export default {
    input : './src/index.ts',
    output : {
        file : "./dist/_r.js",
        format: "iife",
        name: "_r",
        sourcemap : true,
        intro : 'console.log("babylon runtime v(' + pkg.version + ')")'
    },

    external : [
        '../node_modules/babylonjs/es6.js'
    ],
    plugins: [
        typescript()

    ]
}