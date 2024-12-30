import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

const Video = () => {
  const [stream, setStream] = useState(null);
  const [peerId, setPeerId] = useState('');
  const [myId, setMyId] = useState(''); // Store the user's socket ID
  const myVideo = useRef();
  const remoteVideo = useRef();
  const peerRef = useRef();

  useEffect(() => {
    // Get the user's media
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((userStream) => {
        setStream(userStream);
        if (myVideo.current) {
          myVideo.current.srcObject = userStream;
        }
      })
      .catch((error) => console.error('Error accessing media devices:', error));

    // Get the user's socket ID
    socket.on('connect', () => {
      setMyId(socket.id); // Store the connected user's ID
    });

    // Listen for signaling data
    socket.on('signal', (data) => {
      if (data.signal && peerRef.current) {
        peerRef.current.signal(data.signal);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const startPeer = (initiator, to = null) => {
    const peer = new SimplePeer({
      initiator,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      socket.emit('signal', { signal: data, to });
    });

    peer.on('stream', (remoteStream) => {
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = remoteStream;
      }
    });

    peer.on('error', (err) => {
      console.error('Peer connection error:', err);
    });

    peerRef.current = peer;
  };

  const connectToPeer = () => {
    if (!peerId) {
      alert('Enter a peer ID to connect');
      return;
    }
    startPeer(true, peerId); // Start as the initiator
  };

  const handleIncomingCall = () => {
    startPeer(false); // Start as a receiver
  };

  return (
    <div>
      <h1>Video Conference</h1>
      <div>
        <h3>Your Video</h3>
        <video ref={myVideo} autoPlay muted style={{ width: '300px' }} />
      </div>
      <div>
        <h3>Remote Video</h3>
        <video ref={remoteVideo} autoPlay style={{ width: '300px' }} />
      </div>
      <div>
        <h3>Your ID</h3>
        <p>{myId}</p> {/* Display the user's socket ID */}
      </div>
      <input
        type="text"
        placeholder="Enter Peer ID"
        value={peerId}
        onChange={(e) => setPeerId(e.target.value)}
      />
      <button onClick={connectToPeer}>Connect</button>
      <button onClick={handleIncomingCall}>Answer Incoming Call</button>
    </div>
  );
};

export default Video;
