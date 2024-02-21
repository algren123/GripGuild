import express, { Request, Response, Express, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

const cors = require('cors');

dotenv.config();

const prisma = new PrismaClient();

const app: Express = express();

app.use(express.json());
app.use(cors());

// Basic route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Handle 404 Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Sorry, that route does not exist.');
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

async function main() {}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export default app;
