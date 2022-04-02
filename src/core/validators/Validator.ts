export default interface Validator {
  validate(nameField: string, value: any, args: Array<any>): string | boolean;
}
