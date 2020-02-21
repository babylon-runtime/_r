import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json'
import { uglify } from "rollup-plugin-uglify";
import copy from 'rollup-plugin-copy'
export default [{
    input: 'src/index.ts',
    output: {
        file: 'dist/_r.js',
        format: 'umd',
        name: '_r',
        sourcemap : true,
        intro : 'console.log("babylon runtime v' + pkg.version + '")'
    },
    plugins: [
        typescript({
            objectHashIgnoreUnknownHack: true,
        }),
        copy({
            objectHashIgnoreUnknownHack : true,
            targets : [
                { src : 'src/_r.d.ts', dest: 'dist/'}
            ]
        })
    ]
},{
    input: 'src/index.ts',
    output: {
        file: 'dist/_r.min.js',
        format: 'umd',
        name: '_r',
        sourcemap : true,
        intro : 'console.log("babylon runtime v' + pkg.version + '")'
    },
    plugins: [
        typescript(),
        uglify()
    ]
}];