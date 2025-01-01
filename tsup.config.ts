import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs'],
	platform: 'node',
	minify: true,
	keepNames: true,
	splitting: false,
	sourcemap: false,
	clean: true,
	target: 'es2024',
	dts: false,
	bundle: true,
	noExternal: [
		'discord.js',
		'colors',
		'calm.db',
		'parse-duration',
		'axios',
		'dotenv',
	],
	tsconfig: 'tsconfig.json',
});
