const proxyTarget = process.env.VUE_APP_PROXY_TARGET || 'http://localhost:5050';

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: proxyTarget,
        changeOrigin: true,
      },
    },
  },
};
