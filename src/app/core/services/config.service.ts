import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, lastValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any = {};

  constructor(private http: HttpClient) { }

  loadConfig(): Promise<any> {
    return firstValueFrom(this.http.get('assets/config.json').pipe(tap((data) => {
      this.config = data;
    })));
  }

  getConfig(key: string): any {
    return this.config[key];
  }
}
