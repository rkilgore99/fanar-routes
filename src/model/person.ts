import { ID } from "./common";

export class Person {
  readonly id: ID;
  readonly name: string | null;
  readonly givenName: string | null;
  readonly familyName: string | null;
  readonly dateOfBirth: Date | null;

  constructor(props: Person) {
    this.id = props.id;
    this.name = props.name;
    this.givenName = props.givenName;
    this.familyName = props.familyName;
    this.dateOfBirth = props.dateOfBirth;
  }
}
