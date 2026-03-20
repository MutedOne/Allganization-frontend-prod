import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Account } from 'src/app/interface/admin/account/account';
import { Message, ViewId } from 'src/app/interface/global';
import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  getAllAccount(pagination: Pagination, viewId: ViewId) {
    const { pageIndex, search } = pagination;
    const params = new HttpParams({
      fromObject: {
        pageIndex,
        search,
        ...viewId,
      },
    });
    return this.http.get<Account[]>(`${environment.apiURL}/admin/account`, {
      params,
    });
  }
  getTotalAccount(viewId: ViewId) {
    const params = new HttpParams({
      fromObject: {
        ...viewId,
      },
    });
    return this.http.get<Totalpage[]>(
      `${environment.apiURL}/admin/account/total`,
      {
        params,
      },
    );
  }
  getViewAccount(details: ViewId) {
    return this.http.get(
      `${environment.apiURL}/admin/account/view/${details.id}`,
    );
  }

  addAccount(data: any) {
    return this.http.post<Message>(`${environment.apiURL}/admin/account`, data);
  }
  accountResigned(details: ViewId) {
    return this.http.patch(
      `${environment.apiURL}/admin/account/status/${details.id}`,
      {},
    );
  }
  resetPassword(details: ViewId) {
    return this.http.patch(
      `${environment.apiURL}/admin/account/password/reset/${details.id}`,
      {},
    );
  }
  getPromotedAccount(detail: ViewId) {
    console.log(detail);
    return this.http.patch(
      `${environment.apiURL}/admin/account/promotion/${detail.id}`,
      {},
    );
  }
}
