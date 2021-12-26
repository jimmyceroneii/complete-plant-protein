export type EssentialProtein =
  | "Phenylalanine"
  | "Valine"
  | "Tryptophan"
  | "Threonine"
  | "Isoleucine"
  | "Methionine"
  | "Histidine"
  | "Leucine"
  | "Lysine";

export type PlantToProtein = {
  [key: string]: EssentialProtein[];
};

export enum EssentialProteins {
  "Phenylalanine" = 0,
  "Valine" = 1,
  "Tryptophan" = 2,
  "Threonine" = 3,
  "Isoleucine" = 4,
  "Methionine" = 5,
  "Histidine" = 6,
  "Leucine" = 7,
  "Lysine" = 8,
}

export const enumToProteinMap = {
  "Phenylalanine": EssentialProteins.Phenylalanine,
  "Valine": EssentialProteins.Valine,
  "Tryptophan": EssentialProteins.Tryptophan,
  "Threonine": EssentialProteins.Threonine,
  "Isoleucine": EssentialProteins.Isoleucine,
  "Methionine": EssentialProteins.Methionine,
  "Histidine": EssentialProteins.Histidine,
  "Leucine": EssentialProteins.Leucine,
  "Lysine": EssentialProteins.Lysine,
};
