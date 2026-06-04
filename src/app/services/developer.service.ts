import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DeveloperService {
    private http = inject(HttpClient);
    private readonly developerUrl = '/api/developer';

    getDeveloperInfo(): Observable<any> {
        return this.http.get<any>(this.developerUrl);
    }
}