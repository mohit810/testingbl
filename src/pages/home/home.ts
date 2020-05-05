import {ChangeDetectorRef, Component} from '@angular/core';
import { Platform} from 'ionic-angular';
import {IBeacon} from "@ionic-native/ibeacon";
import {isBoolean} from "ionic-angular/util/util";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  homePage: string =null;
  outputdata: any;
  outputerror: any;
  inputdata: any;
  inputerror: any;
  beaconData: any;
  advertinputdata: any;
  advertavailinputerror: any;
  buke: any;
  auther: any;
  bule: any;
  pero: any;


  constructor(public change: ChangeDetectorRef,
              public platform: Platform,
              private ibeacon: IBeacon,) {
    this.homePage =  "1000";

  }
 watch() {

     this.ibeacon.enableBluetooth().then(
       data => this.auther = data,
       error => console.log(error)
     )
     this.ibeacon.getAuthorizationStatus().then(
       data => this.auther = data.authorizationStatus,
       error => console.log(error)
     )
     this.ibeacon.isBluetoothEnabled().then(
       ()=> this.buke = isBoolean(this.ibeacon.isBluetoothEnabled()),
       error => console.log(error)
     )
     this.ibeacon.startAdvertising(this.ibeacon.BeaconRegion('deskBeacon', '7813eab4-9ee5-447b-b3ee-6179c9b9877a', 10, 10, true), -59).then(
       data => this.inputdata = data,//"yay!" + console.log("yay! task done"),
       error => console.log(error)
     )
     this.ibeacon.isAdvertising().then(
       () => this.advertinputdata = isBoolean(this.ibeacon.isAdvertising())  ,
       error => console.log(error)
     )
}
monitor(){
  this.platform.ready().then(()=>{
    // Request permission to use location on iOS
    this.ibeacon.requestAlwaysAuthorization();
// create a new delegate and register it with the native layer
    let delegate = this.ibeacon.Delegate();

// Subscribe to some of the delegate's event handlers
    delegate.didRangeBeaconsInRegion()
      .subscribe(
        data => this.outputdata = data,
        error => console.error()
      );
    delegate.didStartMonitoringForRegion()
      .subscribe(
        data => console.log('didStartMonitoringForRegion: ', data),
        error => console.error()
      );
    delegate.didEnterRegion()
      .subscribe(
        data => {
          console.log('didEnterRegion: ', data);
        }
      );

    let beaconRegion = this.ibeacon.BeaconRegion('deskBeacon','7813eab4-9ee5-447b-b3ee-6179c9b9877a');

    this.ibeacon.startMonitoringForRegion(beaconRegion)
      .then(
        () => console.log('Native layer received the request to monitoring'),
        error => console.error('Native layer failed to begin monitoring: ', error)
      );
  })

  }

  stopBeaconScan() {

  }
}
