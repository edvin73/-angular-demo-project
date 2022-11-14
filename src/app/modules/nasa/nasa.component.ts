import {Component, OnInit, SecurityContext} from '@angular/core';
import {NasaService} from "../../services/nasa.service";
import {environment} from "../../../environments/environment";
import {NasaResponse} from "../../model/NasaResponse";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";

@Component({
  selector: 'app-nasa',
  templateUrl: './nasa.component.html',
  styleUrls: ['./nasa.component.css']
})
export class NasaComponent implements OnInit {

  constructor(private nasaService: NasaService,
              private sanitizer: DomSanitizer) { }

  nasaResponse?: NasaResponse;
  picURL: string = '';
  image?: SafeStyle;
  picDate?: Date;

  ngOnInit(): void {
  }

  getPicOfDay() {
      this.nasaService.getPicOfDay().subscribe({
        next:response => {
          this.nasaResponse = response;

          if(this.nasaResponse && this.nasaResponse.url) {
            this.picURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.nasaResponse.url).toString();

            console.log('this.picURL ' + this.picURL)
          }
          console.log(JSON.stringify(this.nasaResponse))
        },
        error: err => {
          console.error(err.error.message)
        }
      }
  )}

  getPicOfOtherDay() {
    if(this.picDate) {
      this.nasaService.getPicOfOtherDay(this.picDate).subscribe({
        next:response => {
          this.nasaResponse = response;

          if(this.nasaResponse && this.nasaResponse.url) {
            this.picURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.nasaResponse.url).toString();

            console.log('this.picURL ' + this.picURL)
          }
          console.log(JSON.stringify(this.nasaResponse))
        },
        error: err => {
          console.error(err.error.message)
        }
      })
    }
  }

  getSafeUrl() {
    if(this.nasaResponse && this.nasaResponse.url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.nasaResponse.url);
    }

    return null;
  }

  openSafeUrl() {

    if(this.nasaResponse && this.nasaResponse.url) {
      //this.sanitizer.sanitize(SecurityContext.URL, this.nasaResponse.url)

      this.picURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.nasaResponse.url).toString();
    }
  }
}
