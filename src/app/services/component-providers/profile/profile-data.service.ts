import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../../settings/app-config';
import { ComponentDataService } from '../component-data.service';
import { Profile } from '../../../contracts/login-data';

@Injectable()
export class ProfileDataService extends ComponentDataService<Profile> {

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: IAppConfig) {
      super('api/v1/profile', http, config);
  }

  getDataById(id1: string, id2: string) {
    return this.http.get<any>(`${this.uriPath}/${id1}/employee/${id2}`);
  }

  setDataById(componentData: Profile, id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };

    return this.client.post<any>(`${this.uriPath}/${id}`, componentData, options);
  }
}
