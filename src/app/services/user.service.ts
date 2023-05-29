import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';
import { catchError } from 'rxjs/operators';
import { UserResponse } from '../components/home/user-response';


@Injectable()
export class UserService {
    public url: string;
    public identity?: User | null;
    public token?: string | null;


    constructor(
        public _http: HttpClient
    ) {
        this.url = global.url;
    }

    register(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'register', params, { headers: headers });
    }
    signup(user: any, gettoken?: boolean): Observable<any> {
        if (gettoken ?? false) {
            user.gettoken = true;
        }

        let json = JSON.stringify(user);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    update(user: any): Observable<any> {
        const token = localStorage.getItem('token');
        if (token) {
            let headers = new HttpHeaders().set('Authorization', token);
            return this._http.put(this.url + 'update', user, { headers });
        } else {
            return of(null);
        }
    }


    getIdentity() {
        let identity = localStorage.getItem('identity');

        if (identity && identity !== 'undefined') {
            this.identity = JSON.parse(identity);
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('token');


        if (token && token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    logout(): Observable<any> {
        this.getToken();
        let headers = {
            'Authorization': `Bearer ${this.token}`
        };
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        return this._http.delete(`${this.url}logout`, { headers });
    }

    sendContact(formData: any): Observable<any> {
        let json = JSON.stringify(formData);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'contact', params, { headers: headers });
    }



    getAllUsers(page: number, pageSize: number, filters: any): Observable<UserResponse> {
        const token = localStorage.getItem('token');
        if (token) {
            let headers = new HttpHeaders().set('Authorization', token);
            const params = new HttpParams()
                .set('page', page.toString())
                .set('pageSize', pageSize.toString())
                .set('filters', JSON.stringify(filters));
            console.log(filters)

            return this._http.get<UserResponse>(this.url + 'getallusers', { headers, params })
                .pipe(
                    catchError(error => {
                        console.error('Error fetching users:', error);
                        return throwError(error);
                    })
                );
        } else {
            const nullUserResponse: UserResponse = {
                data: [],
                totalPages: 0,
                currentPage: 0
            };
            return of(nullUserResponse);
        }
    }


    getUserByToken(): Observable<any> {
        const token = localStorage.getItem('token');
        if (token) {
            let headers = new HttpHeaders().set('Authorization', token);
            return this._http.get<any[]>(this.url + 'getuserbytoken', { headers });
        } else {
            return of(null);
        }
    }

    updateProfileImage(file: File, userId: string) {
        const token = localStorage.getItem('token');
        if (token) {
            const formData = new FormData();
            formData.append('image', file, `${userId}.jpg`);
            let headers = new HttpHeaders().set('Authorization', token);
            return this._http.post<any>(this.url + 'api/profile/update-img', formData, { headers });
        } else {
            return of(null);
        }
    }

    getProfileImage(): Observable<any> {
        const token = localStorage.getItem('token');
        if (token) {
            const headers = {
                Authorization: token
            };
            return this._http.get<any>(`${this.url}api/profile/image`, { headers });
        } else {
            return of({
                'status': 'no-registered',
                'code': 200, // HTTP OK status code
                'profile_img': 'http://localhost:8000/uploads/profile-img/default.png',
            });
        }
    }
    reportUser(reporterId: number, reportedId: number, description: string): Observable<any> {
        const token = localStorage.getItem('token');
        if (token) {
            const headers = {
                'Authorization': token,
                'Content-Type': 'application/json'
            };
            const body = {
                reporterId,
                reportedId,
                description
            };
            return this._http.post<any>(`${this.url}api/tickets`, body, { headers });
        } else {
            return of(null);
        }
    }

    getReportedUsers(status?: string): Observable<any> {
        const token = localStorage.getItem('token');
        if (token) {
            const headers = {
                Authorization: token
            };
            let apiUrl = `${this.url}api/reported-users`;
            if (status) {
                apiUrl += `/${status}`;
            }
            return this._http.get<any>(apiUrl, { headers });
        } else {
            return of(null);
        }
    }

    solveTicket(ticket: any): Observable<any> {
        const token = localStorage.getItem('token');
        if (token) {
            const headers = {
                Authorization: token
            };
            ticket.status = 'solved'; // Actualizar el estado a 'solved'
            return this._http.put<any>(`${this.url}api/tickets/${ticket.id}`, ticket, { headers });
        } else {
            return of(null);
        }
    }
    
    

    getUserById(id: number): Observable<any> {
        const token = localStorage.getItem('token');
        if (token) {
            const headers = {
                Authorization: token
            };
            return this._http.get<any>(`${this.url}api/users/${id}`, { headers });
        } else {
            return of(null);
        }
    }
    









}
