const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db/connection.js");
const {
  Update,
  getInfo,
  getHowClasses,
  OneStud,
  JournalStud,
  SpisokGroup,
  StudentDiscs,
  getInfoByTeacher,
  getDVOTM,
  getJOURNAL,
  getInfoAboutWorkload2,
  getInfoAboutDisc,
  getInfoByTeacherType,
  getGroup,
  getInfoAboutWorkload,
  getJournal,
  saveJournal,
  GetListUser,
  GetListUserStudent,
  ListFacultyForTeacher,
  SaveInfoAccount,
  CheckAccaunt
} = require("./controllers/CommFuct.js");
const path = require('path');
const app = express();
// Настройка статической папки для фронтенда
app.use(express.static(path.join(__dirname, 'dist')));
// Обработка всех остальных запросов и отправка index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Требуются имя пользователя и пароль" });
  }
  if (role == "teacher") {
    const sql =
      "SELECT id, CONCAT(lastname,' ',name,' ',patronymic)AS username, password  FROM teacher WHERE CONCAT(lastname,' ',name,' ',patronymic) = ?";
    db.query(sql, [username], async (err, result) => {
      if (err || result.length === 0) {
        res.status(404).json({ message: "Имя пользователя не найдено" });
      } else {
        var user = [];
        user.push({
          id: result[0].id,
          username: result[0].username,
          role: role,
        });
        const match = await bcrypt.compare(password, result[0].password);
        if (match) {
          const token = jwt.sign(
            { userId: result[0].id, role: role },
            "my_secret_key",
            { expiresIn: "1h" }
          );
          res.json({ message: "Вход в систему прошел успешно", token, user });
        } else {
          res.status(401).json({ message: "Неверный пароль" });
        }
      }
    });
  }
  if (role == "student") {
    const sql =
      "SELECT id, CONCAT(lastname,' ',name,' ',patronymic) AS `username`, `group`, `password` FROM student WHERE CONCAT(lastname,' ',name,' ',patronymic) = ?";
    db.query(sql, [username], async (err, result) => {
      if (err || result.length === 0) {
        res.status(404).json({ message: "Имя пользователя не найдено" });
      } else {
        var user = [];
        user.push({
          id: result[0].id,
          username: result[0].username,
          group: result[0].group,
          role: role,
        });
        const match = await bcrypt.compare(password, result[0].password);
        if (match) {
          const token = jwt.sign(
            { userId: result[0].id, role: role },
            "my_secret_key",
            { expiresIn: "1h" }
          );
          res.json({ message: "Вход в систему прошел успешно", token, user });
        } else {
          res.status(401).json({ message: "Неверный пароль" });
        }
      }
    });
  }
  if (role == "admin") {
    const sql =
      "SELECT id, username, password FROM user WHERE username = ?";
    db.query(sql, [username], async (err, result) => {
      if (err || result.length === 0) {
        res.status(404).json({ message: "Имя пользователя не найдено" });
      } else {
        var user = [];
        user.push({
          id: result[0].id,
          username: result[0].username,
          role: role,
        });
        const match = await bcrypt.compare(password, result[0].password);
        if (match) {
          const token = jwt.sign(
            { userId: result[0].id, role: role },
            "my_secret_key",
            { expiresIn: "1h" }
          );
          res.json({ message: "Вход в систему прошел успешно", token, user });
        } else {
          res.status(401).json({ message: "Неверный пароль" });
        }
      }
    });
  }
});

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Пользователь неавторизован" });
  }
  const extractedToken = token.split(" ")[1];
  try {
    const decoded = jwt.verify(extractedToken, "my_secret_key");
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ message: "Неверный token" });
  }
};

const enteruser = (req, res) => {
  const userId = req.userId;
  const role = req.role;
  if (role == "teacher") {
    const sql =
      "SELECT id, CONCAT(lastname,' ',name,' ',patronymic) AS username FROM teacher WHERE id = ?";
    db.query(sql, [userId], (err, result) => {
      if (err || result.length === 0) {
        res
          .status(500)
          .json({ message: "Ошибка при получении подробной информации" });
      } else {
        res.json({
          id: result[0].id,
          username: result[0].username,
          role: role,
        });
      }
    });
  }
  if (role == "student") {
    const sql =
      "SELECT id, CONCAT(lastname,' ',name,' ',patronymic) AS username, group FROM student WHERE id = ?";
    db.query(sql, [userId], (err, result) => {
      if (err || result.length === 0) {
        res
          .status(500)
          .json({ message: "Ошибка при получении подробной информации" });
      } else {
        res.json({
          id: result[0].id,
          username: result[0].username,
          group: result[0].group,
          role: role,
        });
      }
    });
  }
  if (role == "admin") {
    const sql =
      "SELECT id, username FROM user WHERE id = ?";
    db.query(sql, [userId], (err, result) => {
      if (err || result.length === 0) {
        res
          .status(500)
          .json({ message: "Ошибка при получении подробной информации" });
      } else {
        res.json({
          id: result[0].id,
          username: result[0].username,
          role: role,
        });
      }
    });
  }
};

app.get("/checkaccaunt", CheckAccaunt);
app.get("/saveinfoaccount", SaveInfoAccount);
app.get("/listuserfaculty", ListFacultyForTeacher);
app.get("/profile", authenticate, enteruser);
app.get("/listuser", GetListUser);
app.get("/update", Update);
app.get("/teachers", getInfo);
app.get("/listuserstudent", GetListUserStudent);
app.get("/teachers/:teacher", getInfoByTeacher);
app.get("/discipline", getInfoAboutDisc);
app.get("/type", getInfoByTeacherType);
app.get("/group", getGroup);
app.get("/workload", getInfoAboutWorkload);
app.get("/journalgroup", getJournal);
app.get("/saveJournal", saveJournal);
app.get("/workload2", getInfoAboutWorkload2);
app.get("/datetype", getDVOTM);
app.get("/journal", getJOURNAL);
app.get("/howclasses", getHowClasses);
app.get("/perecgroup", SpisokGroup);
app.get("/studentfisc", StudentDiscs);
app.get("/workload3", OneStud);
app.get("/journalgroupstudent", JournalStud);

app.listen(port, () => {
  console.log("Сервер успешно запущен, порт ${port}");
});
