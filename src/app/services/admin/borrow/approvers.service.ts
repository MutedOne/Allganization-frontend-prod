import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { buildQueryParams } from 'src/app/helper/queryBuilder';
import { AddApprover, Approver, approverList } from 'src/app/interface/admin/borrow/approver';
import { Message, ViewId } from 'src/app/interface/global';
import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApproversService {
  private http = inject(HttpClient);
  addApprover(data: AddApprover) {
    return this.http.post<Message>(
      `${environment.apiURL}/admin/borrow/approvers`,
      data,
    );
  }
  getAllApprover(pagination: Pagination, approverId: ViewId) {
    const { currentPage, search } = pagination;
    const params = buildQueryParams({
      currentPage: currentPage,
      search: search,
      filter: {
        approverId: approverId.id,
      }
    });
    return this.http.get<approverList>(
      `${environment.apiURL}/admin/borrow/approvers`,
      {
        params,
      },
    );
  }
  getTotalApprover(viewId: ViewId) {
    const params = new HttpParams({
      fromObject: {
        ...viewId,
      },
    });
    return this.http.get<Totalpage[]>(
      `${environment.apiURL}/admin/borrow/approvers/total`,
      { params },
    );
  }
}
