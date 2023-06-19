// vite.config.js

export default {
    build: {
      rollupOptions: {
        external: ['hydra-synth', 'tone'],
      },
    },
  };
  