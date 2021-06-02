import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TarefaModel } from 'src/app/model/TarefaModel';
import { TarefaService } from 'src/app/services/tarefa.service';



@Component({
  selector: 'app-tabela-tarefa-concluida',
  templateUrl: './tabela-tarefa-concluida.component.html',
  styleUrls: ['./tabela-tarefa-concluida.component.scss']
})
export class TabelaTarefaConcluidaComponent implements OnInit {


  dataTable: any[] = [];

  //TODO resolver como chamar o metodo na classe filho para atualizar o modal de edicao de tarefa
  // @ViewChild(DialogEditaTarefaComponent)  child:DialogEditaTarefaComponent;

  displayedColumns: string[] = ['nome_tarefa', 'prioridade', 'duracao', 'descricao'];
  dataSource: any = new MatTableDataSource<TarefaModelInterface>(this.dataTable);
  modalInfo : boolean = false;
  dialogEdicao : boolean = false;
  tarefaInfo:any;
  disable:any;
  indiceTarefaEdicao:string= '';
  carregaTarefaEdicao:string='';

  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {

    this.escutaTarefaFinalizada();
   
  }

  escutaTarefaFinalizada(){
    this.tarefaService.emitirTarefaFinalizada.subscribe(() => {
        this.recarregaLista();
      }
    );
  }

  escutaTarefaConcluidaDeletada(){
    this.tarefaService.emitirTarefaConcluidaDeletada.subscribe(() => {
      this.recarregaLista();
    }
  );

  }
  

  recarregaLista() {
    // this.dataTable.push(tarefaCriada);

    this.dataTable=[];
    this.tarefaService.listaDeTarefasConcluida.map((elemento) => {
      this.dataTable.push({
        nome_tarefa: (elemento.nomeTarefa),
        prioridade: (elemento.prioridade), 
        descricao: (elemento.descricao), 
        indice: (elemento.id),
        duracao: (elemento.duracao) 
        });
      });
    this.ordenaListaPorPrioridade();
    this.dataSource = new MatTableDataSource(this.dataTable);
  }



  deleteTarefa($event: Event, indice: string) {
    this.tarefaService.deleteTarefaConcluida(indice);
    this.recarregaLista();
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

