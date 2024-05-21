import { Component, OnDestroy, OnInit } from '@angular/core';
import Peer from 'peerjs';

@Component({
  selector: 'app-rtcclient',
  templateUrl: './rtcclient-2.component.html',
  styleUrls: ['./rtcclient-2.component.css']
})
export class RtcclientComponent2 implements OnInit, OnDestroy {
  peer: any
  peerId:any
  ngOnInit(): void {
    this.peer = new Peer();

    this.peer.on('open', (id: any) => {
      console.log('My (RTC Client) Peer ID is: ' + id);
      this.peerId = id;
    });

   

    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        // Success: stream is your local media stream
        // You can display it in a video element
        const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
        localVideo.srcObject = stream;

        this.peer.on('call', (call: any) => {
          console.log("I was called so I answered")
          call.answer(stream); // Answer the call with your local media stream
        });

      }
      )

  }
  callAPeer(callerId: string) {

    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        const call = this.peer.call(callerId, stream);

        this.peer.on('call', (call: any) => {
          call.answer(stream); // Answer the call with your local media stream
        });

        call.on('stream', (remoteStream: any) => {
          // Display remote stream in a video element
          const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
          remoteVideo.srcObject = remoteStream;
        });

      })

  }
  ngOnDestroy(): void {
    this.peer.disconnect();
  }

}
