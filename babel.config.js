module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], // transform modern JS for Node
    '@babel/preset-react', // transform JSX
    '@babel/preset-typescript', // transform TS/TSX
  ],
};
