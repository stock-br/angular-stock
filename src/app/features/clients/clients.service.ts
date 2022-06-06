import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private _http: HttpClient) {}

  public getClients(): Observable<any> {
    return this._http.get(`${environment.baseUrl}/client`);
  }

  public getClientById(id: string): Observable<any> {
    return this._http.get(`${environment.baseUrl}/client/${id}`);
  }

  public createClient(client: Client): Observable<any> {
    return this._http.post(`${environment.baseUrl}/client`, client);
  }

  public updateClient(id: string, client: Client): Observable<any> {
    return this._http.put(`${environment.baseUrl}/client/${id}`, client);
  }

  public deleteClient(client: Client): Observable<any> {
    return this._http.delete(`${environment.baseUrl}/client/${client._id}`);
  }
}

export interface Client {
  _id?: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  createdAt?: string;
  updatedAt?: string;
}
