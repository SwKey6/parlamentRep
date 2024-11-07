const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Путь к файлу, в котором будем хранить посты
const postsFilePath = path.join(__dirname, 'posts.json');

// Массив для хранения постов
let posts = [];

// Функция для загрузки постов из файла
const loadPosts = () => {
    if (fs.existsSync(postsFilePath)) {
        const data = fs.readFileSync(postsFilePath, 'utf-8');
        posts = JSON.parse(data);
    }
};

// Функция для сохранения постов в файл
const savePosts = () => {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
};

// Загрузка постов при старте сервера
loadPosts();

// Middleware для работы с JSON
app.use(bodyParser.json());
app.use(cors());  // Позволяет кросс-доменные запросы (CORS)

// Отправка списка всех постов
app.get('/api/posts', (req, res) => {
    res.json(posts);  // Отправляем все посты
});

// Добавление нового поста
app.post('/api/posts', (req, res) => {
    const { title, content, password } = req.body;

    // Проверка наличия пароля (можно изменить на проверку с реальной логикой)
    if (!password || password !== 'EM2024') {
        return res.status(403).json({ error: 'Forbidden: Invalid password' });
    }

    // Добавляем новый пост в массив
    const newPost = { id: posts.length + 1, title, content, password };
    posts.push(newPost);

    // Сохраняем посты в файл
    savePosts();

    // Отправляем новый пост обратно на клиент
    res.status(201).json(newPost);
});

// Удаление поста с проверкой пароля
app.delete('/api/posts/:id', (req, res) => {
    const { password } = req.body;  // Пароль из запроса
    const postId = parseInt(req.params.id, 10);
    const postIndex = posts.findIndex(post => post.id === postId);

    // Проверка пароля
    if (!password || password !== 'EM2024') {
        return res.status(403).json({ error: 'Forbidden: Invalid password' });
    }

    if (postIndex !== -1) {
        posts.splice(postIndex, 1);  // Удаляем пост из массива
        savePosts();  // Сохраняем изменения в файл
        res.status(200).json({ message: 'Post deleted' });
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, 'news-app')));