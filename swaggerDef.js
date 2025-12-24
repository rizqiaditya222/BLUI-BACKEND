module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'BLUI Personal Finance API',
    version: '1.0.0',
    description: 'API documentation for BLUI Personal Finance Management',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
    {
      url: 'http://159.223.67.39:3000',
      description: 'VPS server',
    },
  ],
};