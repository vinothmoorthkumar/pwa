import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatListOption } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { makeid } from '../util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {


  constructor(public dialog: MatDialog, private router: Router,) { }
  users:[];
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogUser, {
      width: '250px',
      data: {selectedUser:[]}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.users = result;
    });
  }

  start(){
    let game: any = localStorage.getItem('game');
    let gameId = makeid();
    if (game) {
      let parsedata = JSON.parse(game);
      parsedata.push({ id: gameId, users: this.users })
      localStorage.setItem('game', JSON.stringify(parsedata));
    } else {
      localStorage.setItem('game', JSON.stringify([{ id: gameId, users: this.users }]));
    }
    this.router.navigate(['/sboard',gameId]);
  }
}


@Component({
  selector: 'dialog-user',
  templateUrl: 'user-dialog.html',
})
export class DialogUser {
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogUser>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  loginForm: FormGroup;
  fullName: string;
  userlist: [];
  selectedUser: [];
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
    this.updateUser();
  }

  updateUser() {
    let user: any = localStorage.getItem('user');
    this.userlist = JSON.parse(user);
  }

  add() {
    let user: any = localStorage.getItem('user');
    if (user) {
      let parsedata = JSON.parse(user);
      parsedata.push({ id: makeid(), name: this.fullName })
      localStorage.setItem('user', JSON.stringify(parsedata));

    } else {
      localStorage.setItem('user', JSON.stringify([{ id: makeid(), "name": this.fullName }]));
    }
    this.updateUser();
    this.fullName ='';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectionChange(list) {
    this.data.selectedUser = list.selectedOptions.selected.map(item => item.value);
  }
}
