import { nanoid } from 'nanoid'
import express  from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ShortUrl from './model/shortUrl.model.js';
import cors from 'cors'

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json())

dotenv.config();

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL
const URI = process.env.URI

mongoose.connect(URI)
.then(() => console.log('MongoDB connected successfully..'))
.catch(err => console.log(err))

app.post('/', async (req, res) => {
    const url = req.body.url;
    const id = nanoid(10);
    const shortUrl = BASE_URL.concat('/',id);

    await ShortUrl.create({
        full: url,
        short: id
    });

    return res.status(201).json({ shortenedUrl: shortUrl });
})

app.get('/:url', async (req,res) => {
    const url = req.params.url;
    const document = await ShortUrl.findOne({ short: url });
    if(document == null) return res.sendStatus(404);

    document.clicks++;
    document.save();
    const actualUrl = document.full;
    return res.status(200).redirect(actualUrl);
})

app.listen(PORT, () => {
    console.log(`server running at port: ${PORT}`)
});