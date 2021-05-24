import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder} from '@angular/forms';
import { TarefaModel } from 'src/app/model/TarefaModel';
import { TarefaService } from 'src/app/services/tarefa.service';



@Component({
  selector: 'app-card-adiciona-tarefa',
  templateUrl: './card-adiciona-tarefa.component.html',
  styleUrls: ['./card-adiciona-tarefa.component.scss']
 
})


export class CardAdicionaTarefaComponent implements OnInit {

   
  // tarefa: TarefaModel = new TarefaModel();
  // tarefaService=new TarefaService();
  // submitted = false;
  // tarefaForm: FormGroup ;
  // formBuilder: FormBuilder = new FormBuilder();

  constructor(
    private tarefaService:TarefaService,
    private tarefa:TarefaModel,
    private formBuilder:FormBuilder,
    public tarefaForm:FormGroup
    ) {


    
    // console.log(this.tarefa.nomeTarefa);
   }

  ngOnInit(): void {
    // this.tarefaForm = this.formBuilder.group({

    // });
  }

  // adicionaTarefa(){
  //   console.log("adicionou");
  // }

  // onSubmit(){
  //   if((this.tarefa.nomeTarefa !== '') && (this.tarefa.prioridade !== '') && (this.tarefa.descricao !== '') )
  //   {
  //     console.log("objeto pronto");
  //     this.tarefaService.adicionaTarefa(this.tarefa);
  //   }
  //   // console.log("objeto Criado"+this.tarefa.nomeTarefa);
  //   // console.log("objeto Criado"+this.tarefa.descricao);
  //   // console.log("objeto Criado"+this.tarefa.prioridade);
  // }

  // adicionaInputTarefa($event: any){

  //   console.log($event.target.name);
  //   console.log($event.target.value+' | ');
  //   if( $event.target.name === "nomeTarefa" )
  //   {
  //     this.tarefa.nomeTarefa = $event.target.value;
  //     console.log(this.tarefa.nomeTarefa);
  //   }else{
  //     if( $event.target.name === "prioridade" )
  //     {
  //       this.tarefa.prioridade = $event.target.value;
  //       console.log(this.tarefa.prioridade);
  //     }else{
  //       if( $event.target.name === "descricao" )
  //       {
          
  //       this.tarefa.descricao = $event.target.value;
  //       console.log(this.tarefa.descricao);
  //       }
  //     }
  //   }
    

  // }
}
