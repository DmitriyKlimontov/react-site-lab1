const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Настройка подключения к MySQL
const db = mysql.createPool({
  host: "localhost",
  user: "root", // Ваш пользователь
  password: "", // Ваш пароль
  database: "stroymaster_db",
  charset: "utf8mb4",
});

// --- CRUD ОПЕРАЦИИ ДЛЯ ТОВАРОВ ---

// Получить все товары
app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("ОШИБКА БАЗЫ ДАННЫХ:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Добавить товар
app.post("/api/products", (req, res) => {
  const { name, price, rating, reviews, image } = req.body;
  db.query(
    "INSERT INTO products SET ?",
    { name, price, rating, reviews, image },
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

// Обновить товар
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("UPDATE products SET ? WHERE id = ?", [req.body, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id, ...req.body });
  });
});

// Удалить товар
app.delete("/api/products/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(200);
  });
});

// --- АВТОРИЗАЦИЯ ---
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length > 0) {
        res.json({
          success: true,
          user: { name: "Администратор", isAdmin: results[0].isAdmin },
        });
      } else {
        res.status(401).json({ success: false, message: "Неверные данные" });
      }
    }
  );
});

app.listen(5000, () => console.log("Сервер запущен на порту 5000"));
