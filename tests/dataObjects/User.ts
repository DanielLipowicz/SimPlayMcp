import { Vehicle } from './Vehicle';

export class User {
  readonly email: string;
  readonly password: string;
  readonly ownedVehicles: Vehicle[];

  constructor(email: string, password: string, ownedVehicles: Vehicle[]) {
    this.email = email;
    this.password = password;
    this.ownedVehicles = ownedVehicles;
  }

  static builder(): UserBuilder {
    return new UserBuilder();
  }

  get ownedVehicleNames(): string[] {
    return this.ownedVehicles.map((vehicle) => vehicle.name);
  }
}

export class UserBuilder {
  private emailValue = '';
  private passwordValue = '';
  private ownedVehiclesValue: Vehicle[] = [];

  withEmail(email: string): this {
    this.emailValue = email;
    return this;
  }

  withPassword(password: string): this {
    this.passwordValue = password;
    return this;
  }

  withOwnedVehicles(ownedVehicles: Vehicle[]): this {
    this.ownedVehiclesValue = ownedVehicles;
    return this;
  }

  build(): User {
    return new User(this.emailValue, this.passwordValue, this.ownedVehiclesValue);
  }
}
