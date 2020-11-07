import React,{useEffect,useState,useCallback} from 'react'
import './Videostream.css'
import {useParams} from 'react-router-dom'
import Peer from 'peerjs'
const peersall={}
function Videostream({socket}) {

    const roomId=useParams().uid
        useEffect(()=>{
          const videoGrid=document.querySelector('.video-grid')
          const myPeer= new Peer(undefined,{
            host:'/',
            port:'4000'
          })

          const myvideo=document.createElement('video')
          myvideo.muted=true
          navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
          }).then(stream=>{
            addVideoStream(myvideo,stream)

            myPeer.on('call',(call)=>{
              call.answer(stream)
              const newvideo=document.createElement('video')
              call.on('stream',userVideoStream=>{
                addVideoStream(newvideo,userVideoStream)
              })
            })
            socket.on('user-connected',userId=>{
              console.log(userId)
                connectTonewUser(userId,stream)
            })
          })
          
          socket.on('user-disconnected',userid=>{
            if(peersall[userid])
            peersall[userid].close()
          })
          myPeer.on('open',id=>{
            socket.emit('join-room',roomId,id)
          })
          const connectTonewUser=(userId,stream)=>{
            const call=myPeer.call(userId,stream)
            const newvideo=document.createElement('video')
            call.on('stream',userVideoStream=>{
              addVideoStream(newvideo,userVideoStream)
            })
            call.on('close',()=>{
              newvideo.remove();
            })
            peersall[userId]=call
          }
          const addVideoStream=(video,stream)=>{
            video.srcObject=stream
            video.addEventListener('loadedmetadata',()=>{
              video.play()
            })
            videoGrid.append(video)
          }
          if(document.getElementsByTagName('video').length>0)
          document.getElementsByTagName('video')[0].setAttribute('autoPlay','');
        })
    return (

        <div className="video-grid">
           
        </div>
    )
}

export default Videostream
