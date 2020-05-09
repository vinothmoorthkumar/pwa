import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

const ELEMENT_DATA = [
  {name: 1, round1: 'Hydrogen'},
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {
  displayedColumns;
  dataSource = [];
  initColums=[{name:'Name',key:'name'}]
  currentGame:any;
  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    const gameId = this.route.snapshot.params.id;
    let game: any = localStorage.getItem('game');
    let parsedata = JSON.parse(game);
    this.currentGame= parsedata.find(ele=>ele.id==gameId)
    this.dataSource=this.currentGame.users;
    this.updateCol()
  }

  updateCol(){
    this.displayedColumns=this.initColums.map(ele=>ele.key)
  }
  addround(){
    let round =this.initColums.length;
    this.initColums.push({name:`Round ${round}`,key:`round${round}`})
    this.updateCol()
  }
}
