interface Generator {
  generate(configGenerator: any): void;
  getName(): string;
}

export default Generator;
