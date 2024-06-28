class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random()
  }

  public getSignature(): number {
    return this.signature;
  }
}

abstract class House {
  private door: boolean;
  private tenants: Person[];

  constructor(private key: Key) {
    this.door = false;
    this.tenants = [];
  }

  public comeIn(person: Person): void {
    if (!this.door) {
      throw new Error("The door is closed.");
    }
    this.tenants.push(person);
  }

  protected doOpenDoor(): void {
    this.door = true;
  }

  protected validateKey(key: Key): boolean {
    return this.key.getSignature() === key.getSignature();
  }

  public abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  public openDoor(key: Key): void {
    if (!this.validateKey(key)) {
      throw new Error("The key is not valid.");
    }

    this.doOpenDoor();
  }
}

class Person {
  constructor(private key: Key) {
  }

  public getKey(): Key {
    return this.key;
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);


export {};