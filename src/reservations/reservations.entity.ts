export class Reservations {
  userId: number;
  date: Date;
  classroomId: number;
  time: string;
  purpose: string;
  classId: number;
  description: string;

  constructor(
    userId: number,
    date: Date,
    classroomId: number,
    time: string,
    purpose: string,
    classId: number,
    description: string,
  ) {
    this.userId = userId;
    this.date = date;
    this.classroomId = classroomId;
    this.time = time;
    this.purpose = purpose;
    this.classId = classId;
    this.description = description;
  }
}
