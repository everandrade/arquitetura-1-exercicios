import { StudentDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class StudentDatabase extends BaseDatabase {
    public static TABLE_STUDENTS = "students"

    public async findStudents(q: string | undefined) {
        let studentsDB

        if (q) {
            const result: StudentDB[] = await BaseDatabase
                .connection(StudentDatabase.TABLE_STUDENTS)
                .where("name", "LIKE", `%${q}%`)

            studentsDB = result
        } else {
            const result: StudentDB[] = await BaseDatabase
                .connection(StudentDatabase.TABLE_STUDENTS)

            studentsDB = result
        }

        return studentsDB
    }

    public async findStudentById(id: string) {
        const [studentsDB]: StudentDB[] | undefined[] = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .where({ id })

        return studentsDB
    }

    public async insertStudent(newStudentDB: StudentDB) {
        await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .insert(newStudentDB)
    }

    public async updatedStudent(id: string, updateStudent: StudentDB) {
      console.log(updateStudent);
        await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .update(updateStudent)
            .where({ id })
    }

    public async deleteStudentById(id: string) {
        await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .del()
            .where({ id })
    }
}