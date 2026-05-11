import { HttpParams } from "@angular/common/http";

export function buildQueryParams(options: {
    currentPage?: number;
    search?: string;
    filter?: Record<string, any>;
}) {
    let params = new HttpParams();

    if (options.currentPage !== undefined) {
        params = params.set('currentPage', options.currentPage);
    }

    if (options.search) {
        params = params.set('search', options.search);
    }

    if (options.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params = params.set(`filter[${key}]`, value);
            }
        });
    }

    return params;
}