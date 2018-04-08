import React, { Component } from 'react';
//import logo from 'logo.png';
import './App.css';
import {StitchClientFactory, BSON} from 'mongodb-stitch';
import {Timeline, TimelineEvent} from 'react-event-timeline'
import Dropzone from 'react-dropzone'
//var BSON = require('bson')


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { commits: [], files: []};
        console.log(this.state.commits)
    }


    componentDidMount() {
        fetch('https://api.github.com/repos/kvkadakia/Chatbot/commits?per_page=100&sha=848d1badd1f613d0e6301ba1a81541e7a616270f')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ commits: data })
            });
       console.log(this.state.commits)
    }


    onDrop(commit_id, files) {
        this.setState({files});
        console.log(files[0])
        var file = BSON.Binary(files[0], 0)
        console.log(files[0])
        var appId = 'gitmedia-ebisg';
        let stitchClientPromise = StitchClientFactory.create(appId);
        stitchClientPromise.then(stitchClient => {
            return stitchClient.login().then(() => {
                var s3Service = stitchClient.service("aws-s3", "media-doc");
                s3Service.put("media-doc", commit_id+".mp3", "public-read", "audio/mp3", file);
            });
        })
        console.log("im here")

    }


    render() {
        const { commits, files } = this.state;

        return (
            <div className="App" id ="div1">
                <header height="10px" className="App-header">
                     <img src="https://www.rosehosting.com/blog/wp-content/uploads/2014/12/mongodb.png" className="App-logo" alt="logo" />
                     <h1 className="App-title">Media-Doc</h1>
                </header>
                <Timeline>
                {commits.map(commit =>
                    <TimelineEvent
                        title={commit['sha']}
                        createdAt={commit['commit']['message']}
                        iconColor = "#87ceeb"
                    >
                        {(commit['sha'] == '4e1844ae447892b86ca914d758a7e641a5b84608') ? (
                            <img src="https://s3.amazonaws.com/media-doc/4e1844ae447892b86ca914d758a7e641a5b84608.jpg"/>
                        ) : (<span></span>
                        )}
                        {(commit['sha'] == '3794c7e5b11a8d0a04bb021f52211075211aa369') ? (
                            <video width="40%" poster="https://s3.amazonaws.com/media-doc/thumbnail.jpeg" controls="controls"><source src="https://s3.amazonaws.com/media-doc/3794c7e5b11a8d0a04bb021f52211075211aa369.mp4" type="video/mp4"/></video>
                        ) : (
                            <span></span>
                        )}
                        {(['848d1badd1f613d0e6301ba1a81541e7a616270f', 'ec4304b4b5f3dc81731975a7f8bcb78d75b40ac8', '2986f5c50bf3fb1bcd0c16919c86e07deba8aca5'].indexOf(commit['sha']) != -1) ? (
                            <audio controls="controls"><source src={"https://s3.amazonaws.com/media-doc/" + commit['sha'] + ".mp3"} type="audio/mpeg"/></audio>
                        ) : (
                            <span></span>
                        )}
                        {(['848d1badd1f613d0e6301ba1a81541e7a616270f', 'ec4304b4b5f3dc81731975a7f8bcb78d75b40ac8', '2986f5c50bf3fb1bcd0c16919c86e07deba8aca5', '3794c7e5b11a8d0a04bb021f52211075211aa369', '4e1844ae447892b86ca914d758a7e641a5b84608'].indexOf(commit['sha']) >= 0) ? (
                            <span></span>
                        ) : (
                            <section>
                                <div className="dropzone">
                                    <Dropzone onDrop={this.onDrop.bind(this, commit['sha'])}>
                                        <p>Try dropping some files here, or click to select files to upload.</p>
                                    </Dropzone>
                                </div>
                            </section>
                        )}
                    </TimelineEvent>
                )}
                </Timeline>
            </div>
        );
    }
}

export default App;
