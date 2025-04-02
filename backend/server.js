require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs')
const path = require('path');

const app = express();
const PORT = 5000;
const POSTS_FILE = path.join(__dirname, 'posts.json');

app.use(cors());
app.use(express.json());

const getPosts = () => {
    try {
        const data = fs.readFileSync(POSTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Função para salvar os posts no JSON
const savePosts = (posts) => {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf8');
};

// Rota para buscar os posts
app.get('/posts', (req, res) => {
    const posts = getPosts();
    res.json(posts);
});

// Rota para adicionar um novo post
app.post('/posts', (req, res) => {
    const { post } = req.body;
    if (!post) {
        return res.status(400).json({ error: "Post não pode estar vazio!" });
    }

    const posts = getPosts();
    posts.push(post);
    savePosts(posts);

    res.json({ message: "Post salvo com sucesso!", posts });
});

app.listen( PORT, () => {
    console.log(`SERVIDOR RODANDO EM http://localhost:${PORT}`);
});

