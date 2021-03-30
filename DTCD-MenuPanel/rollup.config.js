import path from 'path';

import alias from '@rollup/plugin-alias';
import styles from 'rollup-plugin-styles';
import vue from 'rollup-plugin-vue2';
import replace from '@rollup/plugin-replace';

const watch = Boolean(process.env.ROLLUP_WATCH);

const pluginName = 'MenuPanel';

const projectSrcDir = path.join(path.resolve(__dirname), 'src');

const fileDest = watch ? `./../../DTCD/server/plugins/DTCD-${pluginName}/${pluginName}.js` : `./build/${pluginName}.js`;

const plugins = [
	alias({
		entries: {
			'@': projectSrcDir,
		},
	}),
	vue(),
	styles({
		mode: 'inject',
	}),
	replace({
		preventAssignment: true,
		'process.env.NODE_ENV': JSON.stringify('production'),
		'process.env.VUE_ENV': JSON.stringify('browser'),
	}),
];

export default {
	input: `src/Plugin.js`,
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
