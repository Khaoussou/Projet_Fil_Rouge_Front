export interface Cour {
    semestre: string
    module: string
    professeur: string
    cours: CourClasse[]
  }
  
  export interface CourClasse {
    id: number
    classe: string
    annee: string
    nbr_heure: number
    nbr_heure_effectue: number
  }