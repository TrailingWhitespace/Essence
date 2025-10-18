import pkg from '@prisma/client';
const { PrismaClient } = pkg;

// import { PrismaClient } from '@prisma/client'; doesnt work on node 24

const prisma = new PrismaClient();
export default prisma;
