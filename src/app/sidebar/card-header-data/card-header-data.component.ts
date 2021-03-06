import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-header-data',
  templateUrl: './card-header-data.component.html',
  styleUrls: ['./card-header-data.component.scss']
})
export class CardHeaderDataComponent implements OnInit {

  @Input() icone = '';
  @Input() info:any;
  @Input() classe_green_bg: string[]=["false"];

  classe_icone:string='';
  classe_info:string='';
  info_1='';
  info_2='';
  info_3='';

  constructor() { }

  ngOnInit(): void {
    this.info_1=this.info[0];
    this.info_2=this.info[1];
    this.info_3=this.info[2];
   
    if(this.classe_green_bg[0] != "false")
    {
      this.classe_icone="icon-containe-green";
      this.classe_info="card-info-container-green";
     
    }else{
      this.classe_icone="icon-container";
      this.classe_info="card-info-container";
    }
   
  }
  
}
