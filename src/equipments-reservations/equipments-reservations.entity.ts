export class EquipmentsReservation {
  userId: number;
  date: Date;
  time: string;
  equipmentId: number;
  description: string;

  constructor(
    userId: number,
    date: Date,
    time: string,
    equipmentId: number,
    description: string,
  ) {
    this.userId = userId;
    this.date = date;
    this.time = time;
    this.equipmentId = equipmentId;
    this.description = description;
  }
}
