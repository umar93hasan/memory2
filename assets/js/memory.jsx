import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';

export default function game_init(root, channel) {
    ReactDOM.render( < MemoryGame channel={channel} /> , root);
}

function Tile(props) {
    var showVal = props.display ? props.value : '';
    var color = props.done ? '#58e358' : '#d2d2d2';
    if(!props.done && props.display)
        color = '#e0c555';
    return ( <button style={{backgroundColor: color}} className = "square" onClick = {props.onClick}>
        {showVal}
    </button>
    );
}

class MemoryGame extends React.Component {
    constructor(props) {
        super(props);
        this.channel = props.channel;
        this.reset = this.reset.bind(this);
        this.state = {
            tiles: [{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false},{value: '', display: false, done: false}],
            openTile: -1,
            matches: 0,
            clicks: 0,
            clickDisable: false
        };

        this.channel.join()
          .receive("ok", this.gotView.bind(this))
          .receive("error", resp => { console.log("Unable to join", resp) });
    }


  gotView(view) {
    this.setState(view.game);
  }


    handleClick(i) {


        if (!this.state.clickDisable && !this.state.tiles[i].display) {
            if (this.state.openTile == -1) {
                this.channel.push("firstTile",{tile: i})
                  .receive("ok", this.gotView.bind(this))
            } else if (i != this.state.openTile) {
                if (this.state.tiles[i].value == this.state.tiles[this.state.openTile].value) {
                    this.channel.push("tileMatch",{tile: i})
                        .receive("ok", this.gotView.bind(this))
                } else {
                    var tiles = this.state.tiles;
                    var clicks = this.state.clicks + 1;
                    var openTile = this.state.openTile;
                    tiles[i].display = true;
                    this.setState({
                        tiles: tiles,
                        clickDisable: true
                    });
                    setTimeout(() => {
                        this.channel.push("tileMismatch",{tile: openTile})
                            .receive("ok", this.gotView.bind(this))
                    }, 1000);
                }

            }
        }
    }

    renderTile(i) {
        return ( <Tile index = {i}
            done = {this.state.tiles[i].done}
            display = {this.state.tiles[i].display}
            value = {this.state.tiles[i].value}
            onClick = {() => this.handleClick(i)}
            />
        );
    }
    reset() {
      this.channel.push("reset")
        .receive("ok", this.gotView.bind(this));
    }
    render() {
        var label = "Moves";
        var moves = this.state.clicks;
        if (this.state.matches == 8) {
            label = "Game Over! Your Score";
        }
        return ( <div className = "container">
            <div className = "row"> {
                this.renderTile(0)
            } {
                this.renderTile(1)
            } {
                this.renderTile(2)
            } {
                this.renderTile(3)
            } </div>
            <div className = "row" > {
                this.renderTile(4)
            } {
                this.renderTile(5)
            } {
                this.renderTile(6)
            } {
                this.renderTile(7)
            } </div>
            <div className = "row" > {
                this.renderTile(8)
            } {
                this.renderTile(9)
            } {
                this.renderTile(10)
            } {
                this.renderTile(11)
            } </div>
            <div className = "row" > {
                this.renderTile(12)
            } {
                this.renderTile(13)
            } {
                this.renderTile(14)
            } {
                this.renderTile(15)
            } </div>
            <div className = "row large-text" > {label} : {moves} </div>
            <div className = "row" >
            <button className = "btn-warning"
                    onClick = {this.reset} > Reset Game </button>
            </div>
            </div>
        );
    }
}
