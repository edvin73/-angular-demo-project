import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NasaResponse} from "../model/NasaResponse";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  nasaResponse?: NasaResponse;
  nasaResponses: NasaResponse[]=[];

  constructor(private httpClient: HttpClient) { }

  public getPicOfDay() {

    const headers = new HttpHeaders();

    headers.set("api-key", environment.API_KEY)

    return this.httpClient.get<NasaResponse>(environment.nasaServerAPI+"?api_key="+environment.API_KEY);

  }

  public getPicOfOtherDay(dt: Date) {


    return this.httpClient.get<NasaResponse>(environment.nasaServerAPI+"?date="+dt+"&api_key="+environment.API_KEY);

  }
}
