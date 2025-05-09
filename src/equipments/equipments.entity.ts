export class Equipments {
  name: string;
  type: string;
  tombNumber: string;
  description: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    type: string,
    tombNumber: string,
    description: string,
  ) {
    this.name = name;
    this.type = type;
    this.tombNumber = tombNumber;
    this.description = description;
    this.createdAt = new Date(); // Define o timestamp atual
    this.updatedAt = new Date();
  }
}
