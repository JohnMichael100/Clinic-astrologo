import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Minimal Vite setup: the React plugin is all this project needs.
export default defineConfig({
  plugins: [react()],
});
