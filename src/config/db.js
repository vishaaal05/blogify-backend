const { PrismaClient } = require('@prisma/client');

let prisma;

try {
  prisma = new PrismaClient({
    log: ['error', 'warn'],
    errorFormat: 'minimal',
  });

  // Test the connection
  prisma.$connect()
    .then(() => {
      console.log('Successfully connected to the database');
    })
    .catch((error) => {
      console.error('Failed to connect to the database:', error);
    });
} catch (error) {
  console.error('Failed to initialize Prisma client:', error);
  process.exit(1);
}

module.exports = prisma;
