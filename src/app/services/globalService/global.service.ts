import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) {}


 

  private walletSubject = new BehaviorSubject<string>('');
  wallet$ = this.walletSubject.asObservable();

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  setWallet(wallet: string) {
    this.walletSubject.next(wallet);
  }

  setUser(user:any){
    this.userSubject.next(user);
  }
  // Get user by connected wallet, p.s I didn't found registration api so I take random user from api
  userAddress:string = '0x61cgcc03bqtozc1xpz1uybzl4bg20f37tahcdw43'
  authMe(){
      return this.http.get(`https://new-backend.unistory.app/api/data/address/${this.userAddress}`)
  }
  getUser(address: string){
    return this.http.get(`https://new-backend.unistory.app/api/data/address/${address}`)
}


  signUpBeta(userData: any){
return this.http.get('https://new-backend.unistory.app/api/data?page=1&perPage=11')
  }

  getUsersList(page: number, perPage: number){
    return this.http.get(`https://new-backend.unistory.app/api/data?page=${page}&perPage=${perPage}`)
  }
}
