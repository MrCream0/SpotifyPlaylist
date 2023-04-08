
import SearchResults from '../SearchResults/SearchResults';
import './App.css';
import React from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistname = this.updatePlaylistname.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistname(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);

    if (trackUris && trackUris.length) {
      Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
        this.setState({
          playlistName: "New Playlist",
          playlistTracks: [],
        });
      });
    } else {
      alert("Playlist empty");
    }

    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() =>{
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    })
  }

  search(term){
    Spotify.search(term).then((searchResults => {
      this.setState({searchResults: searchResults});
    }
    ));
  }

  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mming</span></h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistname} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
