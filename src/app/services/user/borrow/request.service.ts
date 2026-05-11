import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { buildQueryParams } from 'src/app/helper/queryBuilder';
import { ApproveRequest, approveRequestList, approverList } from 'src/app/interface/admin/borrow/approver';
import {
  AddBorrowRequest,
  BorrowRequest,
  completedRequestList,
  requestList,
} from 'src/app/interface/admin/borrow/borrow';
import { Message, ViewId } from 'src/app/interface/global';
import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private http = inject(HttpClient);
  addrequest(data: AddBorrowRequest) {
    return this.http.post<Message>(
      `${environment.apiURL}/user/borrow/request`,
      data,
    );
  }
  getAllRequests(pagination: Pagination, viewId: ViewId) {
    const { currentPage, search, filter } = pagination;
    const params = buildQueryParams({
      currentPage: currentPage,
      search: search,
      filter: {
      }
    });
    return this.http.get<requestList>(
      `${environment.apiURL}/user/borrow/request`,
      { params },
    );
  }

  getAllCompletedRequests(pagination: Pagination, viewId: ViewId) {
    const { currentPage, search } = pagination;
    const params = buildQueryParams({
      currentPage: currentPage,
      search: search,
      filter: {
      }
    });
    return this.http.get<completedRequestList>(
      `${environment.apiURL}/user/borrow/request/completed`,
      { params },
    );
  }
  getTotalCompletedRequest(viewId: ViewId) {
    const params = new HttpParams({
      fromObject: {
        ...viewId,
      },
    });
    return this.http.get<Totalpage[]>(
      `${environment.apiURL}/user/borrow/request/completed/total`,
      {
        params,
      },
    );
  }
  approveListRequest(pagination: Pagination, viewId: ViewId) {
    const { currentPage, search } = pagination;
    const params = buildQueryParams({
      currentPage: currentPage,
      search: search,
      filter: {
      }
    });
    return this.http.get<approveRequestList>(
      `${environment.apiURL}/user/borrow/request/approved`,
      { params },
    );
  }
  approveTotalListRequest(viewId: ViewId) {
    const params = new HttpParams({
      fromObject: {
        ...viewId,
      },
    });
    return this.http.get<Totalpage[]>(
      `${environment.apiURL}/user/borrow/request/total/approved`,
      { params },
    );
  }
  approveRequest(data: any) {
    return this.http.post<Message>(
      `${environment.apiURL}/user/borrow/request/approve`,
      data,
    );
  }
}
