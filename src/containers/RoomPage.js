import React from 'react'
import MediaContainer from './MediaContainer'
import CommunicationContainer from './CommunicationContainer'
import { connect } from 'react-redux'
import store from '../store'
import io from 'socket.io-client'

class RoomPage extends React.Component {
  constructor(props) {
    super(props);

  }
  getUserMedia = navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  }).catch(e => alert('getUserMedia() error: ' + e.name))


  socket = io.connect({
    path: "/" + document.getElementById("mybase").href.split("/").slice(3 , 100).join("/") + "socket.io/"
  })
  componentWillMount() {
    this.props.addRoom();
  }
  render(){
    return (
      <div>
        <MediaContainer media={media => this.media = media} socket={this.socket} getUserMedia={this.getUserMedia} />
        <CommunicationContainer socket={this.socket} media={this.media} getUserMedia={this.getUserMedia} />
      </div>
    );
  }
}
const mapStateToProps = store => ({rooms: new Set([...store.rooms])});
const mapDispatchToProps = (dispatch, ownProps) => (
    {
      addRoom: () => store.dispatch({type: 'ADD_ROOM', room: ownProps.params.room})
    }
  );
export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
