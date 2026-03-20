import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Position } from 'src/app/interface/admin/account/position';

import { ViewId } from 'src/app/interface/global';
import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private http = inject(HttpClient);

  getAllPosition(pagination: Pagination, viewId: ViewId) {
    const { pageIndex, search } = pagination;
    const params = new HttpParams({
      fromObject: {
        pageIndex,
        search,
        ...viewId,
      },
    });
    return this.http.get<Position[]>(
      `${environment.apiURL}/admin/account/position`,
      {
        params,
      },
    );
  }
  getAllTotalPosition(viewId: ViewId) {
    const params = new HttpParams({
      fromObject: {
        ...viewId,
      },
    });
    return this.http.get<Totalpage[]>(
      `${environment.apiURL}/admin/account/position/total`,
      { params },
    );
  }

  getViewPosition(detail: ViewId) {
    return this.http.get<Position[]>(
      `${environment.apiURL}/admin/account/position/view/${detail.id}`,
    );
  }

  getDepartmentPosition(viewId: ViewId) {
    return this.http.get<Position[]>(
      `${environment.apiURL}/admin/position/${viewId.id}`,
    );
  }
}
