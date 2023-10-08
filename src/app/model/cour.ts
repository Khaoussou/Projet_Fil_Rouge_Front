export interface Cour {
  cour_id: number;
  semestre: string;
  module: string;
  professeur: string;
  cours: CourClasse[];
}

export interface CourClasse {
  classe_annee_id: number;
  cours_classe_id: number;
  professeur?: string;
  professeur_id?: number;
  classe: string;
  annee: string;
  nbr_heure: number;
  nbr_heure_restant?: number;
  nbr_heure_effectue: number;
}
