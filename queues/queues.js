import { createClient } from 'redis';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
import { createQueue } from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createBullBoard as createBullBoardMQ } from '@bull-board/bullmq';
import { createBullMQAdapter } from '@bull-board/bullmq/bullMQAdapter';
import { createBullMQClient } from '@bull-board/bullmq/bullMQClient';
import {    Queue } from 'bullmq';
// create a client
const client = createClient({
  host: 'localhost',
  port: 6379,
});
// connect the client
client.connect();

// scheduler queue
const schedulerQueue = createQueue('scheduler', {
  redis: {
    host: 'localhost',
    port: 6379,
  },
});
