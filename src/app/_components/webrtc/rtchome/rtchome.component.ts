import { Component, OnDestroy, OnInit } from '@angular/core';
import { CallOption, ConnectionType, DataConnection, Peer } from 'peerjs';
@Component({
  selector: 'app-rtchome',
  templateUrl: './rtchome.component.html',
  styleUrls: ['./rtchome.component.css']
})
export class RtchomeComponent implements OnInit, OnDestroy {
  peer: any;
  callerId:string=""
  caller2Id:string=""

  ngOnInit() {
    this.peer = new Peer();

    this.peer.on('open', (id: any) => {
      console.log('My Peer (RTC HOme) ID is: ' + id);
      // Send this ID to User B through the signaling server
    });

    /*
        const conn = this.peer.connect('anotherPeerId');
    
        conn.on('open', () => {
          conn.send('Hello!');
        });
    
        this.peer.on('connection', (conn:any) => {
          console.log(typeof(conn))
          conn.on('data', (data:any) => {
            console.log('Received:', data);
          });
        });
    
        this.peer.on('error', (err:any) => {
          console.error(err);
        });
    
    */
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
        localVideo.srcObject = stream;

        // Now you can call the PeerJS methods to establish a connection with another peer


      })
      .catch((err) => {
        // Error handling: Unable to access media devices
        console.error('Error accessing media devices:', err);
      });
  }

  callAPeer(callerId:string) {

    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        const call = this.peer.call(callerId, stream);

        this.peer.on('call', (call: any) => {
          call.answer(stream); // Answer the call with your local media stream
        });
    
        call.on('stream', (remoteStream: any) => {
          // Display remote stream in a video element
          console.log("I am receiving message from the client")
          const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
          remoteVideo.srcObject = remoteStream;
        });

      })

  }



  callAPeer2(callerId:string) {

    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        const call = this.peer.call(callerId, stream);

        this.peer.on('call', (call: any) => {
          call.answer(stream); // Answer the call with your local media stream
        });
    
        call.on('stream', (remoteStream: any) => {
          // Display remote stream in a video element
          console.log("I am receiving message from the client")
          const remoteVideo = document.getElementById('remoteVideo2') as HTMLVideoElement;
          remoteVideo.srcObject = remoteStream;
        });

      })

  }
  ngOnDestroy() {
    this.peer.disconnect();
  }
}
