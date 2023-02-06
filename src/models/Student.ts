export class Student {

    constructor(
        private id: string,
        private name: string,
        private email: string,
        private classroom: string,
        private createdAt: string
    ) { }

    public getId(): string {
        return this.id;
    }
    public setId(value: string) {
        this.id = value;
    }

    public getName(): string {
        return this.name;
    }
    public setName(value: string) {
        this.name = value;
    }

    public getEmail(): string {
        return this.email;
    }
    public setEmail(value: string) {
        this.email = value;
    }

    public getClassroom(): string {
        return this.classroom;
    }
    public setClassroom(value: string) {
        this.classroom = value;
    }

    public getCreatedAt(): string {
        return this.createdAt;
    }
    public setCreatedAt(value: string) {
        this.createdAt = value;
    }
}