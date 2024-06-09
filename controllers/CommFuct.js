const {
  updateJournal,
  fetchTeachers,
  getJournalStudent,
  fetchWorkloadforStudent,
  getInfoByTeacherDisc,
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
  FetchSpisokGr,
  getInfoAboutUser,
  getInfoAboutUserStudent,
  getListFacultyForTeacher,
  InsertSaveInfoAccount,
  SelectCheckAccaunt
} = require("../models/DatabaseQueries.js");
const bcrypt = require("bcrypt");

const CheckAccaunt = (req, res) => {
  const role = req.query.role;
  const id = req.query.id;
  SelectCheckAccaunt(role, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

const SaveInfoAccount = (req, res) => {
  const role = req.query.role;
  const id = req.query.id;
  const password = bcrypt.hashSync(req.query.password, 12);
  InsertSaveInfoAccount(role, id, password, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

const ListFacultyForTeacher = (req, res) => {
  getListFacultyForTeacher((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

const GetListUserStudent = (req, res) => {
  getInfoAboutUserStudent((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

const GetListUser = (req, res) => {
  const role = req.query.role;
  const group = req.query.group;
  const division_curriculum = req.query.division_curriculum;
  getInfoAboutUser(role, group, division_curriculum, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

const getInfo = (req, res) => {
  fetchTeachers((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const StudentDiscs = (req, res) => {
  const gr = req.query.gr;
  getInfoByStudentDisc(gr, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const SpisokGroup = (req, res) => {
  const id = req.query.id;
  FetchSpisokGr(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const getInfoByTeacher = (req, res) => {
  const teacher = req.params.teacher;
  getInfoByTeacherGroup(teacher, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const getHowClasses = (req, res) => {
  const date = req.query.date;
  const workload = req.query.workload;
  const number_classes = req.query.number_classes;
  fetchRepeatDate(date, workload, number_classes, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const getInfoAboutDisc = (req, res) => {
  const teacher = req.query.teacher;
  const gr = req.query.gr;
  getInfoByTeacherDisc(teacher, gr, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const getInfoByTeacherType = (req, res) => {
  const teacher = req.query.teacher;
  const gr = req.query.gr;
  const discz = req.query.discz;
  getType(teacher, gr, discz, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const getGroup = (req, res) => {
  const gr = req.query.gr;
  fetchGroup(gr, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const getInfoAboutWorkload = (req, res) => {
  const teacher = req.query.teacher;
  const gr = req.query.gr;
  const discz = req.query.discz;
  const type = req.query.type;
  fetchWorkload(teacher, gr, discz, type, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const getJournal = (req, res) => {
  const workload = req.query.workload;
  const date1 = req.query.date1;
  const date2 = req.query.date2;
  fetchJournal(date1, date2, workload, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const saveJournal = (req, res) => {
  for (let i = 0; i < req.query.backGroup.length; i += 1) {
    const data = req.query.backGroup[i];
    const workload = data[0];
    const student = data[1];
    const date = data[2];
    const otm_usp = data[3];
    const otm_posh = data[4];
    const task = data[5];
    const number_classes = data[6];
    insertJournal(
      workload,
      student,
      date,
      otm_usp,
      otm_posh,
      task,
      number_classes,
      (err) => {
        if (err) {
          return res.send(err);
        } 
      }
    );
  }
};
const getInfoAboutWorkload2 = (req, res) => {
  const teacher = req.query.teacher;
  const gr = req.query.gr;
  const discz = req.query.discz;
  fetchWorkload2(teacher, gr, discz, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const OneStud = (req, res) => {
  const gr = req.query.gr;
  const discz = req.query.discz;
  fetchWorkloadforStudent(gr, discz, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const getDVOTM = (req, res) => {
  const workload = req.query.workload;
  const date1 = req.query.date1;
  const date2 = req.query.date2;
  DVOTM(date1, date2, workload, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const getJOURNAL = (req, res) => {
  const workload = req.query.workload;
  fetchJOURNAL(workload, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const JournalStud = (req, res) => {
  const workload = req.query.workload;
  const student = req.query.student;
  const date1 = req.query.date1;
  const date2 = req.query.date2;
  getJournalStudent(date1, date2, workload, student, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
const Update = (req, res) => {
  const id = req.query.id;
  const otm_posh = req.query.otm_posh;
  const otm_usp = req.query.otm_usp;
  const task = req.query.task;
  updateJournal(id, otm_posh, otm_usp, task, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
module.exports = {
  Update,
  JournalStud,
  OneStud,
  SpisokGroup,
  StudentDiscs,
  getInfo,
  getHowClasses,
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
};
