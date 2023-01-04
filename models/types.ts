// istanbul ignore file

export interface CSVRecord {
  id: number;
  json: number[];
}

export interface CSVOutput {
  id: number;
  json: string;
  is_valid: boolean;
}

export interface CSVRawRecord {
  id: string,
  json: string
}