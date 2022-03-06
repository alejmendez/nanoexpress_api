const config = (key: string, defaultValue: any = ""): any => process.env[key] || defaultValue;

export { config };
