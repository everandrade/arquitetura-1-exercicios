import { StudentDatabase } from "../database/StudentDatabase"
import { Student } from "../models/Student"
import { StudentDB, StudentDBPost } from "../types"

export class StudentBusiness {
    public async getStudents(q: string | undefined) {
        const studentDatabase = new StudentDatabase()
        const studentDB = await studentDatabase.findStudents(q)

        const students: Student[] = studentDB.map((studentDB) => new Student(
            studentDB.id,
            studentDB.name,
            studentDB.email,
            studentDB.classroom,
            studentDB.created_at
        ))

        return students
    }

    public async postStudent(input: StudentDBPost) {
        if (typeof input.id !== "string") {
            throw new Error("'id' deve ser string")
        }

        if (typeof input.name !== "string") {
            throw new Error("'name' deve ser string")
        }

        if (typeof input.email !== "string") {
            throw new Error("'email' deve ser string")
        }

        if (typeof input.classroom !== "string") {
            throw new Error("'classroom' deve ser string")
        }

        const studentDatabase = new StudentDatabase()
        const studentDBExists = await studentDatabase.findStudentById(input.id)

        if (studentDBExists) {
            throw new Error("'id' já existe")
        }

        const newStudent = new Student(
            input.id,
            input.name,
            input.email,
            input.classroom,
            new Date().toISOString()
        )

        const newStudentDB: StudentDB = {
            id: newStudent.getId(),
            name: newStudent.getName(),
            email: newStudent.getEmail(),
            classroom: newStudent.getClassroom(),
            created_at: newStudent.getCreatedAt()
        }

        await studentDatabase.insertStudent(newStudentDB)

        const result = {
            message: "Aluno(a) cadastrado(a) com sucesso!",
            newStudent
        }

        return result
    }

    public async putStudentById(input: any) {
        if (!input.newName && !input.newEmail && !input.newClassroom) {
            throw new Error("'name, email e classroom' deve ser string")
        }

        if (input.id !== undefined) {
            if (typeof input.id !== "string") {
                throw new Error("'id' deve ser string")
            }
        }

        if (input.newName !== undefined) {
            if (typeof input.newName !== "string") {
                throw new Error("'name' deve ser string")
            }
        }

        if (input.newEmail !== undefined) {
            if (typeof input.newEmail !== "string") {
                throw new Error("'email' deve ser string")
            }
        }

        if (input.newClassroom !== undefined) {
            if (typeof input.newClassroom !== "string") {
                throw new Error("'classroom' deve ser string")
            }
        }

        const studentDatabase = new StudentDatabase()
        const student = await studentDatabase.findStudentById(input.id)

        if (!student) {
            throw new Error("Aluno(a) não encontrado")
        }

        const updateStudent = {
            id: input.id || student.id,
            name: input.newName || student.name,
            email: input.newEmail || student.email,
            classroom: input.newClassroom || student.classroom,
            created_at: student.created_at,
        }

        await studentDatabase.updatedStudent(input.id, updateStudent)

        return updateStudent
    }

    public async deleteStudentById(id: string) {
        if (typeof id !== "string") {
            throw new Error("'id' deve ser string");
        }

        const studentDatabase = new StudentDatabase()
        const student = await studentDatabase.deleteStudentById(id)

        return student
    }
}