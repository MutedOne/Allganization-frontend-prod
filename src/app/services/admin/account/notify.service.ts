import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { notify } from 'src/app/interface/admin/notification/notify';

import { Message, ViewId } from 'src/app/interface/global';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private http = inject(HttpClient);

  getEvaluateAccount(details: ViewId) {
    return this.http.get<notify>(
      `${environment.apiURL}/admin/account/evaluate/${details.id}`,
    );
  }
}
