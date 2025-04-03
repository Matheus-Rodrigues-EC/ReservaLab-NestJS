/* eslint-disable prettier/prettier */
export class Classes {
  grade: number;
  className: string;
  shift: string;
  description: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(
    grade: number,
    className: string,
    shift: string,
    description: string,
  ) {
    this.grade = grade;
    this.className = className;
    this.shift = shift;
    this.description = description;
    this.createdAt = new Date(); // Define o timestamp atual
    this.updatedAt = new Date();
  }
}
