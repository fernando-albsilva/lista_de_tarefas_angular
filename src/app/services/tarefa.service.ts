import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter } from '@angular/core';
import { TarefaModel } from '../model/TarefaModel';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';


@Injectable({ providedIn: 'root' })
export class TarefaService {


    emitirTarefaAdicionada = new EventEmitter<any>();
    emitirTarefaPausada = new EventEmitter<any>();
    emitirTarefaDeletada = new EventEmitter<any>();
    emitirTarefaConcluidaDeletada = new EventEmitter<any>();
    emitirTarefaPendente = new EventEmitter<any>();
    emitirTarefaConcluida = new EventEmitter<any>();
    emitirTarefaIniciada = new EventEmitter<any>();
    emitirTarefaEditada = new EventEmitter<any>();
    emitirTarefaFinalizada = new EventEmitter<any>();
    emitirTarefaEdicaoModal = new EventEmitter<any>();

    private static _tarefaId: string = '0';
    private _listaDeTarefas: TarefaModel[] = [];
    private _listaDeTarefasConcluidas: TarefaModel[] = [];


    // private snackBar: MatSnackBar
    constructor() { }

    get listaDeTarefas(): TarefaModel[] {

        return this._listaDeTarefas;
    }

    get listaDeTarefasConcluida(): TarefaModel[] {

        return this._listaDeTarefasConcluidas;
    }

    adicionaTarefa(tarefa: any): void {

        tarefa.id = this.adicionaTarefaId();
        this._listaDeTarefas.push(tarefa);

        this.emitirTarefaAdicionada.emit(tarefa);
        this.emitirTarefaPendente.emit(this.listaDeTarefas.length);
        this.mostraMensagem();

    }

    adicionaTarefaId() {

        let indice: number = parseInt(TarefaService._tarefaId);
        indice++;
        TarefaService._tarefaId = indice.toString();
        return TarefaService._tarefaId;
    }

    mostraMensagem(): void {

        // this.snackBar.open('Tarefa adicionada com sucesso!', '', {
        //     duration: 2000,
        //     horizontalPosition: "center",
        //     verticalPosition: "bottom"
        // });
    }


    deleteTarefa(indice: string) {

        this._listaDeTarefas = this._listaDeTarefas.filter((element: any) => {

            console.log("indice a ser excluido:" + indice);
            // console.log(el);
            console.log("indice do elemento da lista: " + element._id);
            console.log(element._id !== indice);

            if (element._id === indice) { this.emitirTarefaDeletada.emit(element); }
            // this.emitirTarefaDeletada.emit();
            return element._id !== indice;
        });
        console.log("listaNova:" + this._listaDeTarefas);
        this.emitirTarefaPendente.emit(this.listaDeTarefas.length);
    }
  
    deleteTarefaConcluida(indice: string) {

        this._listaDeTarefasConcluidas = this._listaDeTarefasConcluidas.filter((element: any) => {

            console.log("indice a ser excluido:" + indice);
            // console.log(el);
            console.log("indice do elemento da lista: " + element._id);
            console.log(element._id !== indice);

            if (element._id === indice) { 
                // this.emitirTarefaConcluida.emit();
            }
            // this.emitirTarefaDeletada.emit();
            return element._id !== indice;
        });
        this.emitirTarefaConcluidaDeletada.emit();
      
    }

    iniciarTarefa(indice: string) {

        // let tarefa: TarefaModel = new TarefaModel();
        this._listaDeTarefas.forEach((elemento) => {
            if (elemento.id === indice) {
                // tarefa = elemento; 

                this.incluiHoraMinSegInicio(elemento);
                this.emitirTarefaIniciada.emit(elemento);
            }
        });

        // this.incluiHoraMinSegInicio(tarefa);

        // this.emitirTarefaIniciada.emit(tarefa);

    }

    pausarTarefa(indice: string) {

        this.emitirTarefaPausada.emit(indice);
    }

    incluiHoraMinSegInicio(tarefa: TarefaModel) {
        let data = new Date();
        if ((tarefa.horaIncio === 0) && (tarefa.minutoInicio === 0) && (tarefa.segundoInicio === 0)) {
            tarefa.horaIncio = data.getHours();
            tarefa.minutoInicio = data.getMinutes();
            tarefa.segundoInicio = data.getSeconds();
        } else {


            tarefa.horaIncio = data.getHours() - (tarefa.horaFim - tarefa.horaIncio);
            tarefa.minutoInicio = data.getMinutes() - (tarefa.minutoFim - tarefa.minutoInicio);
            tarefa.segundoInicio = data.getSeconds() - (tarefa.segundoFim - tarefa.segundoInicio);
        }

    }

    registraTempoTarefaAtiva(hora: number, minuto: number, segundo: number, indiceTarefa: string) {
        this._listaDeTarefas.forEach((elemento) => {
            if (elemento.id === indiceTarefa) {
                // elemento.horaIncio = hora;
                // elemento.minutoInicio = minuto;
                // elemento.segundoInicio = segundo;

                elemento.horaFim = hora;
                elemento.minutoFim = minuto;
                elemento.segundoFim = segundo;
                // elemento.duracao = hora.toString()+":"+minuto.toString()+":"+segundo.toString;
            }

        });

    }

    emiteEventoAtualizaModalEdicao(indiceTarefaEdicao: string) {
        
        this.emitirTarefaEdicaoModal.emit(indiceTarefaEdicao);
    }

    retornaTarefa(indiceTarefa: String): TarefaModel {
        let tarefaEdicao: TarefaModel = new TarefaModel();

        this.listaDeTarefas.map((tarefa) => {
            if (tarefa.id === indiceTarefa) {
                tarefaEdicao = tarefa;
            }
        });

        return tarefaEdicao;
    }
  
    editaTarefa(tarefaNova: TarefaModel) {
        this._listaDeTarefas=this.listaDeTarefas.map((tarefa) => {
                                if (tarefa.id === tarefaNova.id) 
                                {
                                    return tarefaNova;
                                }
                                else
                                {
                                    return tarefa;
                                }
                            });
        this.emitirTarefaAdicionada.emit();
        this.emitirTarefaEditada.emit();
    }

    finalizarTarefa(indiceTarefa:string){
     //TODO o problema é que nao esta atualizando o tempo antes de executar o finalizar tarefa, verificar se algum componente esta sendo zerado antes de gravar os dados
        this._listaDeTarefas= this.listaDeTarefas.filter((tarefa)=>{
            if (tarefa.id === indiceTarefa)
            {
               
                this._listaDeTarefasConcluidas.push(tarefa);
                setTimeout(()=>{
                    this.emitirTarefaFinalizada.emit(tarefa);
                    this.emitirTarefaPendente.emit(this.listaDeTarefas.length);
                },100);
                return false;
            }
            else{
                return true;
            }
        });

        
        
    }
}