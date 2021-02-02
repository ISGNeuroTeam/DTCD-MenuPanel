import path from 'path';

import alias from '@rollup/plugin-alias';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import styles from 'rollup-plugin-styles';
import image from '@rollup/plugin-image';
import vue from 'rollup-plugin-vue';
import replace from '@rollup/plugin-replace';

const watch = Boolean(process.env.ROLLUP_WATCH);

const pluginName = 'MenuPanel';

const projectSrcDir = path.join(path.resolve(__dirname), 'src');

const fileDest = watch ? `./../DTCD/server/plugins/${pluginName}.js` : `./dist/${pluginName}.js`;

const plugins = [
	nodeResolve({browser: true}),
	commonjs(),
	alias({
		entries: {
			'@': projectSrcDir,
		},
	}),
	vue(),
	image(),
	replace({
		'process.env.NODE_ENV': JSON.stringify('development'),
		'process.env.VUE_ENV': JSON.stringify('browser'),
	}),
	styles({
		mode: 'inject',
	}),
];

export default {
	input: `src/${pluginName}`,
	output: {
		file: fileDest,
		format: 'esm',
		sourcemap: false,
	},
	watch: {
		include: ['./src/**'],
	},
	plugins,
};
