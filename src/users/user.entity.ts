export class User {
  name: string;
  surname: string;
  email: string;
  password: string;
  subject: string;
  rule: string;
  createdAt: Date;
  updatedAt: Date;
  Reservation: any[];

  constructor(
    name: string,
    surname: string,
    email: string,
    password: string,
    subject: string,
    rule: string,
  ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.subject = subject;
    this.rule = rule;
    this.createdAt = new Date(); // Define o timestamp atual
    this.updatedAt = new Date();
    this.Reservation = []; // Inicializa como array vazio
  }
}
