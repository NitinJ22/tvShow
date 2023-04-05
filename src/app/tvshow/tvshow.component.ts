import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UseraccountService } from '../services/useraccount.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.css']
})
export class TvshowComponent implements OnInit {

  user: User = new User;
  constructor(private account: UseraccountService, private router: Router) {
    this.user = this.account.userValue;
 }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  navigateToRecommednation(){
    this.router.navigate(["/tvShow/dispShows"])
  }
  navigateToRecommednationGenre(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["/tvShow/dispShows"], { queryParams: { order: 'genre' } }));
    
  }
  navigateToOnlyRecommended(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["/tvShow/dispShows"], { queryParams: { order: 'onlyRecommend' } }));
  }

  logout(){
    this.account.logout();
  }

}
