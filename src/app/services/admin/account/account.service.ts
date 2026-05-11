import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { buildQueryParams } from 'src/app/helper/queryBuilder';
import { Account, AccountList } from 'src/app/interface/admin/account/account';
import { Message, ViewId } from 'src/app/interface/global';
import { Pagination, PaginationDetails, Totalpage } from 'src/app/interface/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  getAllAccount(pagination: Pagination, accountId: ViewId) {
    const { currentPage, search } = pagination;

    const params = buildQueryParams({
      currentPage: currentPage,
      search: search,
      filter: {
        accountId: accountId.id,
      }
    });
    return this.http.get<AccountList>(`${environment.apiURL}/admin/account`, {
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
