import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const ELEMENT_DATA = [
  { name: 1, round1: 'Hydrogen' },
];

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {
  displayedColumns;
  dataSource = [];
  initColums = [{ name: 'Name', key: 'name' }]
  currentGame: any;
  gameId=this.route.snapshot.params.id;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let game: any = localStorage.getItem('game');
    console.log('game',game)
    let parsedata = JSON.parse(game);
    this.currentGame = parsedata.find(ele => ele.id == this.gameId)
    this.dataSource = this.currentGame.users;
    this.updateCol()
  }

  updateCol() {
    this.displayedColumns = this.initColums.map(ele => ele.key)
  }

  addround(game) {
    let round = this.initColums.length;
    this.initColums.push({ name: `Round ${round}`, key: `round${round}` })
    this.dataSource.map(ele => {
      let findUser = game.users.find(obj => obj.id == ele.id)
      ele[`round${round}`] = findUser.score;
      delete findUser.score;
      return ele
    })
    console.log('test',this.dataSource)
    
    localStorage.setItem('score', JSON.stringify({gameId:this.gameId,data:this.dataSource}));
    this.updateCol()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogScore, {
      width: '250px',
      data: { game: this.currentGame }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.game) {
        this.addround(result.game);
      }
    });
  }
}



@Component({
  selector: 'dialog-score',
  templateUrl: 'score-dialog.html',
})
export class DialogScore {
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogScore>,
    @Inject(MAT_DIALOG_DATA) public data) { }
  loginForm: FormGroup;
  userlist: [];
  currentGame: any;
  ngOnInit() {
    this.currentGame = this.data.game;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

