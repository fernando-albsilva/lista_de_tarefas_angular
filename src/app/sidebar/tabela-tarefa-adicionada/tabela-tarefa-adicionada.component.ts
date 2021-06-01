import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TarefaModel } from 'src/app/model/TarefaModel';
import { TarefaService } from '../../services/tarefa.service'
import { DialogEditaTarefaComponent } from '../lista-de-tarefas/dialog-edita-tarefa/dialog-edita-tarefa/dialog-edita-tarefa.component';

@Component({
  selector: 'app-tabela-tarefa-adicionada',
  templateUrl: './tabela-tarefa-adicionada.component.html',
  styleUrls: ['./tabela-tarefa-adicionada.component.scss']
})
export class TabelaTarefaAdicionadaComponent implements OnInit {

  dataTable: any[] = [];

  //TODO resolver como chamar o metodo na classe filho para atualizar o modal de edicao de tarefa
  // @ViewChild(DialogEditaTarefaComponent)  child:DialogEditaTarefaComponent;

  displayedColumns: string[] = ['nome_tarefa', 'prioridade', 'descricao'];
  dataSource: any = new MatTableDataSource<TarefaModelInterface>(this.dataTable);
  modalInfo : boolean = false;
  dialogEdicao : boolean = false;
  tarefaInfo:any;
  disable:any;
  indiceTarefaEdicao:string= '';
  carregaTarefaEdicao:string='';

  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {

    this.escutaTarefaAdicionada();
    this.escutaTarefaFinalizada();
   
  }

  escutaTarefaAdicionada(){
    this.tarefaService.emitirTarefaAdicionada.subscribe(() => {
        this.recarregaLista();
      }
    );
  }

  escutaTarefaFinalizada(){
    this.tarefaService.emitirTarefaFinalizada.subscribe(() => {
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

  finalizaTarefa(indiceTarefa:string){
    this.tarefaService.finalizarTarefa(indiceTarefa);
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

  fechaDialog(valor:string,indiceTarefaEdicao:string){
    if(valor === 'true')
    {
      this.dialogEdicao = false;
    }else{
     this.tarefaService.emitirTarefaPausada.emit();
     this.dialogEdicao = true;
      setTimeout (()=>{this.tarefaService.emiteEventoAtualizaModalEdicao(indiceTarefaEdicao);},100);
    }
    
  }

}

export interface TarefaModelInterface {
  prioridade: string;
  nome_tarefa: string;
  descricao: string;
}
