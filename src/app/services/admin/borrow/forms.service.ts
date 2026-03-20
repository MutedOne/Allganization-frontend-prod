import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Form } from 'src/app/interface/admin/borrow/form';
import { Message, ViewId } from 'src/app/interface/global';
import { Pagination, Totalpage } from 'src/app/interface/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  private http = inject(HttpClient);
  addForms(data: Form) {
    return this.http.post<Message>(
      `${environment.apiURL}/admin/borrow/forms`,
      data,
    );
  }
  getAllforms(pagination: Pagination, viewId: ViewId) {
    const { pageIndex, search, filter } = pagination;

    const params = new HttpParams({
      fromObject: {
        pageIndex,
        search,
        filter,
        ...viewId,
      },
    });
    return this.http.get<Form[]>(`${environment.apiURL}/admin/borrow/forms`, {
      params,
    });
  }
  getTotalForms(viewId: ViewId) {
    const params = new HttpParams({
      fromObject: {
        ...viewId,
      },
    });
    return this.http.get<Totalpage[]>(
      `${environment.apiURL}/admin/borrow/forms/total`,
      { params },
    );
  }
  getDownloadPDFForm(test: any) {
    const { id, form_id } = test;
    const params = new HttpParams({
      fromObject: {
        id,
        form_id,
      },
    });
    return this.http.get<Totalpage[]>(
      `${environment.apiURL}/admin/borrow/forms/download`,
      { params },
    );
  }
}
