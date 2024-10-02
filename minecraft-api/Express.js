const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Включение CORS для разрешения запросов с других доменов
app.use(cors());
app.use(bodyParser.json());

let usedPasswords = new Set(); // Хранение использованных паролей

// Эндпоинт для проверки пароля
app.post('/api/check_password', (req, res) => {
    const { password } = req.body;

    // Проверка на наличие пароля в запросе
    if (!password) {
        return res.status(400).json({ success: false, message: 'Пароль не указан.' });
    }

    // Логика проверки пароля (например, сравнение с сохраненным паролем)
    if (usedPasswords.has(password)) {
        return res.status(400).json({ success: false, message: 'Пароль уже использован.' });
    }

    // Здесь должна быть ваша логика проверки пароля
    // Например, сгенерированный пароль для проверки:
    const generatedPassword = '01tqxnqq'; // Замените это на реальный процесс проверки

    if (password === generatedPassword) {
        usedPasswords.add(password); // Сохранение использованного пароля
        return res.json({ success: true });
    }

    return res.status(400).json({ success: false, message: 'Неверный пароль.' });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
