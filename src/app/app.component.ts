import { Component, OnInit} from '@angular/core';
import Web3 from 'web3';
import { GlobalService } from './services/globalService/global.service';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private web3!: Web3;

  title: string = "frontend"
  metamask: any = false
  wallet: string = "" 
  modal: any = {
    type: "caution",
    header: 'METAMASK EXTENSION',
    text: 'To work with our application, you have to install the',
    link: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
    linkText: 'Metamask browser extension',
    textButton: 'SKIP THIS STEP'
  }

  constructor(private globalService: GlobalService){
  
  }
 
// If user has metamask extension try to connect user's wallet 
async connect() {
  try {
    await window.ethereum.enable();
    window.location.reload
    this.metamask = true
  } catch (error) {
    // if not again trigger modal
 
    this.isModelActive()
  }
}








isModelActive(){

  if(!this.metamask){
    this.metamask = true
    

  } else {
    this.metamask = false
    
  }

}


isExtensionExists(){
      // Checking if user has Metamask extension //
      if (window.ethereum) {
        this.web3 = new Web3(window.ethereum);
        this.metamask = true
      } else {
      // If not trigger modal
      console.log("meatask false")
       this.metamask = false
      }
}

ngOnInit(): void {


  this.isExtensionExists()
    // Check if user connected with wallet and get wallet //
  if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable().then(() => {
      web3.eth.getAccounts().then(accounts => {
        this.wallet = accounts[0];
        this.metamask = true
        // Setting wallet as an observable
        this.globalService.setWallet(this.wallet);
      });
    });
  
  }
}
  




}



  




