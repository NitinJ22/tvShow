import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvShow } from 'src/app/models/TvShow';
import { User } from 'src/app/models/User';
import { TvShowService } from 'src/app/services/tv-show.service';
import { UseraccountService } from 'src/app/services/useraccount.service';
import { LazyLoadEvent } from 'primeng/api';
import { RequestData } from 'src/app/models/request';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  order: String = "";
  genreList: string[];

  tvShowList: TvShow[];
  totalRecord: number;

  user: User;
  successMsg: boolean = false
  // first = 0;
  // rows = 10;

  request: RequestData;
  constructor(private route: ActivatedRoute, private tvShowService: TvShowService, private account: UseraccountService) {
    this.genreList = [];
    this.tvShowList = [];
    this.totalRecord = 0;
    this.request = {};
    this.user = this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  ngOnInit(): void {
    // this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.route.queryParams
      .subscribe(params => {
        this.order = params['order'];
      }
      );

    if (this.order == 'genre') {
      this.tvShowService.getGenres().subscribe(response => {
        if (response.length > 0) {
          this.genreList = response;
        }
      })
    } 
    if (this.order == 'onlyRecommend') {
      
      this.request.genre = "";
      this.request.id = this.user.id;
      this.request.startIndex=0;
      this.request.endIndex=5;
      this.tvShowList = [];
      this.getOnlyRecommended();
    }
    // else {
    //   this.tvShowService.getAllShows().subscribe(response => {
    //     if (response.length > 0) {
    //       this.tvShowList = response;
    //       this.totalRecord = response.length;
    //     }
    //     console.log(response);
    //   })
    // }
  }

  getRecommendation(genre: string) {
    this.request.genre = genre;
    this.request.id = this.user.id;
    this.request.startIndex=0;
    this.request.endIndex=5;
    this.tvShowList = [];
    this.getRecommendedByGenre();
  }

  resetRecommendation(){
    console.log(this.user)
    let recommededList: any = this.user.recommendedShowList;
    if(recommededList.length!=0){
      this.tvShowService.resetRecommendation(this.user).subscribe(response=>{
        if(response.recommendedShowList?.length==0){
          this.tvShowList = [];
          this.user = response;
          sessionStorage.setItem('user', JSON.stringify(this.user));
          console.log(sessionStorage.getItem('user'))
          setTimeout(()=>{
            this.successMsg = true;
          }, 2000)
        }
      })
    }
  }

  loadShows(event: any) {
    console.log(event)
    this.request.startIndex=event.first;
    this.request.endIndex=event.first+5;
    if(event.first+5>this.totalRecord){
      this.request.endIndex=this.totalRecord;
    }
    if(this.order=='genre') this.getRecommendedByGenre()
    else this.getOnlyRecommended();
  }

  getRecommendedByGenre(){
    this.tvShowService.getRecommendation(this.request).subscribe(response => {
      if(response.list!=null){
        this.tvShowList = response.list;
        this.totalRecord = response.listSize;
        this.user = response.user;
      }
    })
  }

  getOnlyRecommended(){
    this.tvShowService.getOnlyRecommended(this.request).subscribe(response => {
      if(response.list!=null){
        this.tvShowList = response.list;
        this.totalRecord = response.listSize;
        this.user = response.user;
      }
    })
  }


  // next() {
  //   this.first = this.first + this.rows;
  // }

  // prev() {
  //   this.first = this.first - this.rows;
  // }

  // reset() {
  //   this.first = 0;
  // }

  // isLastPage(): boolean {
  //   return this.tvShowList ? this.first === (this.tvShowList.length - this.rows) : true;
  // }

  // isFirstPage(): boolean {
  //   return this.tvShowList ? this.first === 0 : true;
  // }

}
