export interface IClassification {
  id: number;
  nameAr: string;
  nameEn: string;
  type: string;
  subClassifications?: IClassification[];
}
export interface IClassificationCount {
  main: number;
  sub: number;
}
