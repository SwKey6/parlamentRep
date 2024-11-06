// Получаем элементы из DOM
const postForm = document.getElementById('postForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const passwordInput = document.getElementById('password');

// Обработчик отправки формы
postForm.addEventListener('submit', addPost);

async function addPost(event) {
    event.preventDefault(); // Останавливаем обычную отправку формы

    // Извлекаем данные из полей
    const title = titleInput.value;
    const content = contentInput.value;
    const password = passwordInput.value; // Получаем значение пароля

    // Проверяем, что пароль введен
    if (!password) {
        alert('Please enter a password.');
        return;
    }

    // Создаем объект с данными нового поста
    const newPost = {
        title: title,
        content: content,
        password: password // Пароль включен в объект
    };

    // Логируем данные перед отправкой для проверки
    console.log('Posting data:', newPost);

    try {
        // Отправляем данные на сервер
        const response = await fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost) // Отправляем данные как JSON
        });

        if (!response.ok) {
            // Если сервер возвращает ошибку (например, неправильный пароль)
            throw new Error('Error adding post');
        }

        // Получаем данные из ответа
        const data = await response.json();
        console.log('Post added:', data);

        // Очищаем поля формы после успешной отправки
        titleInput.value = '';
        contentInput.value = '';
        passwordInput.value = '';
        
        // Перерисовываем список постов (если нужно)
        displayPosts();
    } catch (error) {
        console.error('Error adding post:', error);
        alert('Failed to add post. Please try again.');
    }
}

// Функция для отображения постов
async function displayPosts() {
    try {
        const response = await fetch('http://localhost:5000/api/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();

        const postsList = document.getElementById('postsList');
        
        // Убедимся, что postsList существует, прежде чем работать с ним
        if (!postsList) {
            console.error('postsList element not found');
            return;
        }

        postsList.innerHTML = ''; // Очищаем текущий список постов

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button onclick="deletePost(${post.id})">Delete</button>
            `;
            postsList.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error displaying posts:', error);
    }
}

// Функция для удаления поста
const deletePost = async (id) => {
    const password = prompt('Введите пароль для удаления поста:');
    if (!password) {
        alert('Пароль не введен');
        return;
    }

    try {
        console.log('Sending delete request with password:', password); // Логирование пароля

        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })  // Отправка пароля в теле запроса
        });

        if (response.ok) {
            alert('Пост удалён');
            displayPosts();  // Обновляем список постов после удаления
        } else {
            const error = await response.json();
            alert(error.error || 'Ошибка при удалении поста');
            console.log('Error response:', error); // Логируем ответ от сервера
        }
    } catch (error) {
        alert('Ошибка при удалении поста');
        console.log('Error deleting post:', error); // Логирование ошибки
    }
};

// Загружаем все посты при загрузке страницы
window.onload = displayPosts;