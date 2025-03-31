export class Classes {
  grade: number;
  className: string;
  shift: string;
  descriptiond: string;

  createdAt: Date;
  updatedAt: Date;
  Reservation: any[];

  constructor(
    grade: number,
    className: string,
    shift: string,
    descriptiond: string,
  ) {
    this.grade = grade;
    this.className = className;
    this.shift = shift;
    this.descriptiond = descriptiond;
    this.createdAt = new Date(); // Define o timestamp atual
    this.updatedAt = new Date();
    this.Reservation = []; // Inicializa como array vazio
  }
}
