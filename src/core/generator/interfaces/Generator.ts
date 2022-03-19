export default interface Generator {
  generate(configGenerator: any): void;
  getName(): string;
}
