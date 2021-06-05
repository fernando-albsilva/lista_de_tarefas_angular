import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { JornadaService } from 'src/app/services/jornada.service';



@Component({
  selector: 'app-tabela-jornada-concluida',
  templateUrl: './tabela-jornada-concluida.component.html',
  styleUrls: ['./tabela-jornada-concluida.component.scss']
})
export class TabelaJornadaConcluida implements OnInit {


  dataTable: any[] = [];
  displayedColumns: string[] = ['tipo_jornada', 'registro_jornada', 'data', 'horario_jornada','botoes'];
  dataSource: any = new MatTableDataSource<JornadaModelInterface>(this.dataTable);
 
 
  tarefaInfo:any;
  disable:any;
  indiceTarefaEdicao:string= '';
  carregaTarefaEdicao:string='';

  constructor(private jornadaService: JornadaService) { }

  ngOnInit() {

    this.escutaJornadaFinalizada();
    this.escutaIntervaloFinalizado();
    this.escutaRegistroDeletado();
   
  }

  escutaJornadaFinalizada(){
    this.jornadaService.emitirJornadaFinalizada.subscribe(() => {
        this.recarregaLista();
      }
    );
  }

  escutaIntervaloFinalizado(){
    this.jornadaService.emitirIntervaloFinalizado.subscribe(() => {
        this.recarregaLista();
      }
    );
  }

  escutaRegistroDeletado(){
    this.jornadaService.emitirRegistroDeletado.subscribe(() => {
        this.recarregaLista();
      }
    );
  }

  deletaRegistro(registroId:string){
   this.jornadaService.deletaRegistro(registroId);
  }

  recarregaLista() {
    
    this.dataTable=[];
    this.jornadaService.listaJornada.map((elemento) => {
      this.dataTable.push({
        tipo_jornada: (elemento.tipo),
        registro_jornada: ("Inicio"), 
        data: (elemento.data), 
        horario_jornada: (elemento.horarioCompletoInicio),
        indice: (elemento.id)
        });
      if(elemento.finalizada)
      {
        this.dataTable.push({
          tipo_jornada: (elemento.tipo),
          registro_jornada: ("Fim"), 
          data: (elemento.data), 
          horario_jornada: (elemento.horarioCompletoFim),
          indice: (elemento.id)
          });
      }

      });
    
    this.dataSource = new MatTableDataSource(this.dataTable);
  }

 
}

export interface JornadaModelInterface {
  tipo_jornada: string;
  registro_jornada: string;
  data: string;
  horario_jornada: string;
  indice: string;
}

