import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApproveRequest } from 'src/app/interface/admin/borrow/approver';
import {
  AddBorrowRequest,
  BorrowRequest,
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
    const { pageIndex, search, filter } = pagination;
    const params = new HttpParams({
      fromObject: {
        filter,
        pageIndex,
        search,
        ...viewId,
      },
    });
    return this.http.get<BorrowRequest[]>(
      `${environment.apiURL}/user/borrow/request`,
      { params },
    );
  }
  getTotalRequest(viewId: ViewId) {
    const params = new HttpParams({
      fromObject: {
        ...viewId,
      },
    });
    return this.http.get<Totalpage[]>(
      `${environment.apiURL}/user/borrow/request/total`,
      {
        params,
      },
    );
  }
  getAllCompletedRequests(pagination: Pagination, viewId: ViewId) {
    const { pageIndex, search, filter } = pagination;
    const params = new HttpParams({
      fromObject: {
        filter,
        pageIndex,
        search,
        ...viewId,
      },
    });
    return this.http.get<BorrowRequest[]>(
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
    const { pageIndex, search } = pagination;
    const params = new HttpParams({
      fromObject: {
        pageIndex,
        search,
        ...viewId,
      },
    });
    return this.http.get<ApproveRequest[]>(
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
