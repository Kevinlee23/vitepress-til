```js
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "localhost:port",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\api/, ""),
      },
    },
  },
});
```
