import { Injectable } from '@angular/core';
import { MatSnackBar }  from '@angular/material/snack-bar';
import { EventEmitter } from '@angular/core';
import { TarefaModel } from '../model/TarefaModel';


@Injectable({ providedIn: 'root'})
export class TarefaService{


    emitirTarefaAdicionada = new EventEmitter<any>();

    private static _tarefaId:string='0';
    private static _listaDeTarefas:any[]=[];


    
    constructor(private snackBar: MatSnackBar){  }

    get listaDeTarefas() : any[]{
        
        return TarefaService._listaDeTarefas;
    }
    set listaDeTarefas(listaDeTarefa:any[]) {
        TarefaService._listaDeTarefas = listaDeTarefa;
    }

    adicionaTarefa(tarefa:TarefaModel){
        
        TarefaService._listaDeTarefas.push({nome_tarefa: (tarefa.nomeTarefa) , prioridade: (tarefa.prioridade)  , descricao: (tarefa.descricao), indice:(this.adicionaTarefaId()) })
        this.emitirTarefaAdicionada.emit({nome_tarefa: (tarefa.nomeTarefa) , prioridade: (tarefa.prioridade)  , descricao: (tarefa.descricao), indice: TarefaService._tarefaId })
        // console.log("LISTA ATUALIZADA");
        // console.log(this._listaDeTarefas);
        this.mostraMensagem();
        this.verifica();
    }

    verifica(){
        return TarefaService._listaDeTarefas;
    }

   
    mostraMensagem():void {  

        this.snackBar.open('Tarefa adicionada com sucesso!','',{
            duration:2000,
            horizontalPosition: "center",
            verticalPosition: "bottom"
        });
    }

    adicionaTarefaId(){
        let indice:number =   parseInt(TarefaService._tarefaId);
        indice ++;
        TarefaService._tarefaId=indice.toString();
        return TarefaService._tarefaId;
    }

    deleteTarefa(indice:string){
        // console.log(this._listaDeTarefas);
         TarefaService._listaDeTarefas =  this.listaDeTarefas.filter( (el:any) =>{
            return el.indice !== indice;
        } );
        // console.log(this.listaDeTarefas);
    }
}