export class Classroom {
  name: string;
  capacity: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  Reservation: any[];

  constructor(name: string, capacity: string, description: string) {
    this.name = name;
    this.capacity = capacity;
    this.description = description;
    this.createdAt = new Date(); // Define o timestamp atual
    this.updatedAt = new Date();
    this.Reservation = []; // Inicializa como array vazio
  }
}
