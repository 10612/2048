import { UserConfig, defineConfig } from "vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default (): UserConfig => {
	return defineConfig({
		server: {
			port: 3000,
		},
		resolve: {
			alias: [
				{
					find: /^~/,
					replacement: "",
				},
				{
					find: "@",
					replacement: path.resolve(__dirname, "src"),
				},
			],
			extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
		},
		plugins: [tsconfigPaths(), react(), eslint()],
		worker: {
			format: "es",
			plugins: [tsconfigPaths(), eslint()],
		},
		build: {
			sourcemap: "inline",
			outDir: "build",
		},
	});
};
