import { Request, Response } from 'express'
import { StudentBusiness } from '../business/StudentBusiness'
import { StudentDBPost } from '../types'

export class StudentController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined

            const studentBusiness = new StudentBusiness()
            const output = await studentBusiness.getStudents(q)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public postStudent = async (req: Request, res: Response) => {
        try {
            const { id, name, email, classroom } = req.body

            const input: StudentDBPost = {
                id,
                name,
                email,
                classroom
            }

            const studentBusiness = new StudentBusiness()
            const newStudent = await studentBusiness.postStudent(input)

            res.status(201).send(newStudent)
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public putStudentById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const newName = req.body.name
            const newEmail = req.body.email
            const newClassroom = req.body.classroom

            const input = {
                id,
                newName,
                newEmail,
                newClassroom
            }

            const studentBusiness = new StudentBusiness()
            const updatedStudent = await studentBusiness.putStudentById(input)

            res.status(200).send({
                message: "Dados do aluno(a) atualizado com sucesso!",
                updatedStudent
            })
        } catch (error) {
            console.error(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send({
                    message: error.message,
                })
            } else {
                res.send({
                    message: "Erro inesperado",
                })
            }
        }
    }

    public deleteStudentById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const studentBusiness = new StudentBusiness()
            await studentBusiness.deleteStudentById(id)

            res.status(201).send("Aluno(a) deletado(a) com sucesso!");
        } catch (error) {
            console.log(error);

            if (req.statusCode === 200) {
                res.status(500);
            }

            if (error instanceof Error) {
                res.send(error.message);
            } else {
                res.send("Erro inesperado");
            }
        }
    }
}