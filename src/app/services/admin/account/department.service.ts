import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import {
  AddDepartment,
  Department,
} from 'src/app/interface/admin/account/department';
import { Message, ViewId } from 'src/app/interface/global';
import { Pagination } from 'src/app/interface/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private http = inject(HttpClient);

  getAllDepartment(pagination: Pagination, viewId: ViewId) {
    const { pageIndex, search } = pagination;
    const params = new HttpParams({
      fromObject: {
        pageIndex,
        search,
        ...viewId,
      },
    });
    return this.http.get<Department[]>(
      `${environment.apiURL}/admin/account/department`,
      { params },
    );
  }

  addDepartment(details: AddDepartment) {
    return this.http.post<Message>(
      `${environment.apiURL}/admin/account/department`,
      {
        ...details,
      },
    );
  }
}
