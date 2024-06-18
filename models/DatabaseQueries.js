const db = require("../db/connection");

const SelectCheckAccaunt = (role, id, result) => {
  if (role == 'student'){
  db.query(
    "SELECT id, password FROM student WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
}
if (role == 'teacher'){
  db.query(
    "SELECT id, password FROM teacher WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
}
};

const InsertSaveInfoAccount = (role, id, password, result) => {
  if (role == 'student'){
  db.query(
    "UPDATE `student` SET `password`= ? WHERE id = ?",
    [password, id],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
}
if (role == 'teacher'){
  db.query(
    "UPDATE `teacher` SET `password`= ? WHERE id = ?",
    [password, id],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
}
};
const getListFacultyForTeacher = (result) => {
  db.query(
    "SELECT DISTINCT division_curriculum FROM workload",
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

const getInfoAboutUserStudent = (result) => {
  db.query(
    "SELECT DISTINCT `group` FROM `student` ",
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

const getInfoAboutUser = (role, group, division_curriculum,  result) => {
  if (role == 'teacher') {
    db.query(
      "SELECT workload.division_curriculum, teacher.id , CONCAT(teacher.lastname,' ',teacher.name,' ',teacher.patronymic) AS username FROM workload JOIN teacher ON workload.teacher=teacher.id WHERE workload.division_curriculum = ?", [division_curriculum],
      (err, results) => {
        if (err) {
          result(err, null);
        } else {
          result(null, results);
        }
      }
    );
  }
  if (role == 'student') {
    db.query(
      "SELECT `id`, CONCAT(lastname,' ',name,' ',patronymic) AS username, `password`, `group`  FROM student  WHERE `group` = ?",
      [group], (err, results) => {
        if (err) {
          result(err, null);
        } else {
          result(null, results);
        }
      }
    );
  }
 
};
const fetchTeachers = (result) => {
  db.query(
    "SELECT DISTINCT workload.teacher, teacher.name, teacher.patronymic, teacher.lastname FROM workload JOIN teacher ON workload.teacher=teacher.id",
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const getInfoByStudentDisc = (gr, result) => {
  db.query(
    "SELECT DISTINCT discipline.id, discipline.name  FROM `workload`  JOIN discipline ON workload.discipline = discipline.id WHERE `group` = ?",
    [gr],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const FetchSpisokGr = (id, result) => {
  db.query(
    "SELECT DISTINCT `group` FROM student WHERE student = ?",
    [id],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const getInfoByTeacherGroup = (teacher, result) => {
  db.query(
    "SELECT DISTINCT workload.group FROM workload WHERE teacher = ?",
    [teacher],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const getInfoByTeacherDisc = (teacher, gr, result) => {
  db.query(
    "SELECT DISTINCT discipline.name, workload.discipline FROM workload JOIN discipline ON workload.discipline = discipline.id WHERE workload.teacher = ? AND workload.group = ?",
    [teacher, gr],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const getType = (teacher, gr, discz, result) => {
  db.query(
    "SELECT DISTINCT  workload.load, type_activity.type FROM workload JOIN type_activity ON workload.load = type_activity.id WHERE  workload.teacher = ? AND workload.group = ? AND workload.discipline = ?",
    [teacher, gr, discz],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const fetchGroup = (gr, result) => {
  db.query(
    "SELECT student.id, student.name, student.patronymic, student.lastname FROM student WHERE student.group = ?",
    [gr],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const fetchWorkload = (teacher, gr, discz, type, result) => {
  db.query(
    "SELECT * FROM workload WHERE workload.teacher = ? AND workload.group = ? AND workload.discipline = ? AND workload.load = ?",
    [teacher, gr, discz, type],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const fetchJournal = (date1, date2, workload, result) => {
  db.query(
    "SELECT journal.id, journal.date, journal.workload, journal.student, DATE_FORMAT(`date`, '%e.%m.%Y') AS dateform, type_activity.type, journal.otm_posh, journal.otm_usp, `task`, journal.number_classes   FROM journal join workload ON journal.workload = workload.id join type_activity ON workload.load = type_activity.id  join student ON journal.student = student.id WHERE (journal.date BETWEEN ? AND ?) AND journal.workload IN (?) ORDER BY `date` ASC",
    [date1, date2, workload],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const insertJournal = (
  workload,
  student,
  date,
  otm_usp,
  otm_posh,
  task,
  number_classes,
  result
) => {
  db.query(
    "INSERT INTO journal (id, workload, student, date, otm_usp, otm_posh, task, number_classes) VALUES (NULL, ?,?,?,?,?,?,?)",
    [
      workload,
      student,
      date,
      otm_usp,
      otm_posh,
      task,
      number_classes,
      workload,
      student,
      date,
      number_classes,
    ],
    (err) => {
      if (err) {
        return result(err, null);
      } 
    }
  );
};
const fetchRepeatDate = (date, workload, number_classes, result) => {
  db.query(
    "SELECT id FROM journal WHERE date = ? AND workload = ? AND number_classes = ?",
    [date, workload, number_classes],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const fetchWorkload2 = (teacher, gr, discz, result) => {
  db.query(
    "SELECT id FROM workload WHERE `teacher` = ? AND `group` = ? AND `discipline` = ?",
    [teacher, gr, discz],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const fetchWorkloadforStudent = (gr, discz, result) => {
  db.query(
    "SELECT id FROM workload WHERE  `group` = ? AND `discipline` = ?",
    [gr, discz],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const DVOTM = (date1, date2, workload, result) => {
  db.query(
    "SELECT DISTINCT date, DATE_FORMAT(`date`, '%e.%m.%Y') AS dateform, type_activity.type, journal.number_classes FROM journal join workload ON journal.workload = workload.id join type_activity ON workload.load = type_activity.id WHERE (journal.date BETWEEN ? AND ?) AND journal.workload IN (?) ORDER BY `date` ASC",
    [date1, date2, workload],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const fetchJOURNAL = (workload, result) => {
  db.query(
    "SELECT date, DATE_FORMAT(`date`, '%e.%m.%Y') AS dateform, type_activity.type, journal.student, student.lastname, student.name, student.patronymic, journal.otm_posh, journal.otm_usp, journal.number_classes   FROM journal join workload ON journal.workload = workload.id join type_activity ON workload.load = type_activity.id  join student ON journal.student = student.id WHERE journal.workload IN (?) ORDER BY `date` ASC, journal.number_classes ASC",
    [workload],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const getJournalStudent = (date1, date2, workload, student, result) => {
  db.query(
    "SELECT date, journal.id, DATE_FORMAT(`date`, '%e.%m.%Y') AS dateform, type_activity.type, journal.otm_usp, journal.otm_posh, journal.task, journal.number_classes,journal.number_classes  FROM `journal` join workload ON journal.workload = workload.id join type_activity ON workload.load = type_activity.id WHERE (journal.date BETWEEN ? AND ?) AND journal.workload IN (?) AND journal.student = ? ORDER BY `date` ASC, journal.number_classes ASC",
    [date1, date2, workload, student],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
const updateJournal = (id, otm_posh, otm_usp, task, result) => {
  db.query(
    "UPDATE `journal` SET `otm_posh`=? ,`otm_usp`=? ,`task`=? WHERE `id`=?;",
    [otm_posh, otm_usp, task, id],
    (err, results) => {
      if (err) {
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};
module.exports = {
  updateJournal,
  getJournalStudent,
  fetchWorkloadforStudent,
  getInfoByTeacherDisc,
  fetchTeachers,
  FetchSpisokGr,
  fetchRepeatDate,
  fetchWorkload2,
  DVOTM,
  fetchJOURNAL,
  getInfoByTeacherGroup,
  getInfoByStudentDisc,
  getType,
  fetchGroup,
  fetchWorkload,
  fetchJournal,
  insertJournal,
  getInfoAboutUser,
  getInfoAboutUserStudent,
  getListFacultyForTeacher,
  InsertSaveInfoAccount,
  SelectCheckAccaunt
};
