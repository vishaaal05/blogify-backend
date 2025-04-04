const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Test the connection
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });

module.exports = prisma;
