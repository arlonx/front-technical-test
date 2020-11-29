import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { map } from 'rxjs/internal/operators';
import { ApiItems } from '../models/apiItems';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { ApiUpload } from '../models/apiUpload';

@Injectable({
	providedIn: 'root',
})
export class ItemService {

	constructor(private http: HttpClient) { }

	upload(file: File): any {
		const formData = new FormData();
		formData.append('file', file);
		return this.http.post<ApiUpload>(`${ environment.apiUrl }/items/`, formData )
			.pipe(map((resp) => {
			}));
	}

	read(): Observable<Item[]> {
		return this.http.get<ApiItems>(`${ environment.apiUrl }/items/` )
			.pipe(map((resp) => {
				 resp.items.map((item: Item) => {
					item.creation = new Date(item.creation);
					item.modification = new Date(item.modification);
				});
				return resp.items;
			}));
	}

	download(id: string): Observable<ArrayBuffer> {
		return this.http.get(`${ environment.apiUrl }/items/${id}`, { responseType: 'arraybuffer' });
	}

	// readOne(id): any{
	// 	return this.http.get<Room>(${environment.apiUrl}/room/${id})
	// 		.pipe(map(resp => {
	// 			// store user details and jwt token in local storage to keep user logged in between page refreshes
	// 			return resp;
	// 		}));
	// }

}
