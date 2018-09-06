export interface IProcessedSchema {
  name: string;
  promise: Promise<string>;
}

export type ProcessedSchema = IProcessedSchema[];

export interface IOutput {
  [name: string]: string;
}
