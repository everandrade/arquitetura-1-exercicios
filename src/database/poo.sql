-- Active: 1675262396541@@127.0.0.1@3306
CREATE TABLE students (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    classroom TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);
DROP TABLE students;
INSERT INTO students (id, name, email, classroom)
VALUES
	("s001", "Aluno1", "aluno1@email.com", "B10"),
	("s002", "Aluno2", "aluno2@email.com", "C03"),
	("s003", "Aluno3", "aluno3@email.com", "A02"),
	("s004", "Aluno4", "aluno4@email.com", "F55"),
	("s005", "Aluno5", "aluno5@email.com", "A12");
