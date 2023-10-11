import { Component } from '@angular/core';
import { EtudiantService } from 'src/app/service/etudiant.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent {
  public file!: File;
  public tabInscriptions: any;

  constructor(private inscripService: EtudiantService) {}

  inscripFile(event: any) {
    this.file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.file);
    fileReader.addEventListener('load', () => {
      const tab = XLSX.read(fileReader.result, { type: 'binary' });
      const etudiant = tab.SheetNames;
      this.tabInscriptions = XLSX.utils.sheet_to_json(tab.Sheets[etudiant[0]], {
        raw: false,
      });
    });
  }

  add() {
    this.inscripService.add(this.tabInscriptions).subscribe((response) => {
      console.log(response);
    });
  }
}
