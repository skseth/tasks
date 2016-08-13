import express from 'express';
import path from 'path';

var app = express();

app.use(express.static(path.join('build', 'public')));

app.listen(3010, () => console.log('Example app listening on port 3010!'));
