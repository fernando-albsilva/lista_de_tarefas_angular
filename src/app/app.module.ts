import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, FormGroup }   from '@angular/forms';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { CardHeaderComponent } from './sidebar/card-header/card-header.component';
import { CardAdicionaTarefaComponent } from './sidebar/card-adiciona-tarefa/card-adiciona-tarefa.component';
import { CardInformacoesComponent } from './sidebar/card-informacoes/card-informacoes.component';
import { CardAcoesComponent } from './sidebar/card-acoes/card-acoes.component';
import { ListaDeTarefasComponent } from './sidebar/lista-de-tarefas/lista-de-tarefas.component';
import { TabelaTarefaAdicionadaComponent } from './sidebar/tabela-tarefa-adicionada/tabela-tarefa-adicionada.component';
import { TarefaService } from './services/tarefa.service';
import { TarefaModel } from './model/TarefaModel';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    CardHeaderComponent,
    CardAdicionaTarefaComponent,
    CardInformacoesComponent,
    CardAcoesComponent,
    ListaDeTarefasComponent,
    TabelaTarefaAdicionadaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
    

  

  ],
  providers: [
    TarefaService,
    TarefaModel,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
