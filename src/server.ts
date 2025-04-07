import express from 'express';

const app = express();

const PORT: number = 3000;

app.get('/ping', (req, res) => {
    res.send('Pong');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server`);
});