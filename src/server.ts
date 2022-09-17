import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { Translator } from './openai';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req: Request, res: Response) => {
  res.send('Expresss + TypeScript Server base');
});

app.post('/translate', async (req: Request, res: Response) => {
  const {languages, text} = req.body
  if(!languages || !text){
    res.status(400).send("Invalid body, must contain languages and text")
  }
  const response = await Translator({languages, text})
  res.send(response);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});