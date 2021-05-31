import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TarefaModel } from 'src/app/model/TarefaModel';
import { TarefaService } from '../../services/tarefa.service'

@Component({
  selector: 'app-tabela-tarefa-adicionada',
  templateUrl: './tabela-tarefa-adicionada.component.html',
  styleUrls: ['./tabela-tarefa-adicionada.component.scss']
})
export class TabelaTarefaAdicionadaComponent implements OnInit {

  dataTable: any[] = [];


  displayedColumns: string[] = ['nome_tarefa', 'prioridade', 'descricao'];
  dataSource: any = new MatTableDataSource<TarefaModelInterface>(this.dataTable);
  modalInfo : boolean = false;
  tarefaInfo:any;
  disable:any;
 

  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {

    this.escutaTarefaAdicionada();
   
  }

  escutaTarefaAdicionada(){
    this.tarefaService.emitirTarefaAdicionada.subscribe(() => {
        this.recarregaLista();
      }
    );
  }


  recarregaLista() {
    // this.dataTable.push(tarefaCriada);

    this.dataTable=[];
    this.tarefaService.listaDeTarefas.map((elemento) => {
      this.dataTable.push({
        nome_tarefa: (elemento.nomeTarefa),
        prioridade: (elemento.prioridade), 
        descricao: (elemento.descricao), 
        indice: (elemento.id) 
        });
      });
    this.ordenaListaPorPrioridade();
    this.dataSource = new MatTableDataSource(this.dataTable);
  }



  deleteTarefa($event: Event, indice: string) {
    this.tarefaService.deleteTarefa(indice);
    this.recarregaLista();
  }

  
  iniciarTarefa(indiceTarefa:string){
    this.tarefaService.iniciarTarefa(indiceTarefa);
  }
  
  pausarTarefa(indiceTarefa:string){
    this.tarefaService.pausarTarefa(indiceTarefa);
  }

  mostrarInformacaoTarefa($event: Event, elemento: any) {
    this.tarefaInfo=elemento;
    this.modalInfo=true;

  }

  fecharModalInformacaoTarefa(){
    this.tarefaInfo='';
    this.modalInfo=false;
  }

  ordenaListaPorPrioridade() {
    this.dataTable.sort((a, b) => {
      if (parseInt(a.prioridade) < parseInt(b.prioridade)) { return -1; }
      if (parseInt(a.prioridade) > parseInt(b.prioridade)) { return 1; }
      return 0;
    });
  }


}

export interface TarefaModelInterface {
  prioridade: string;
  nome_tarefa: string;
  descricao: string;
}
