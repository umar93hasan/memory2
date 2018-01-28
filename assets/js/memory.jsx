import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<MemoryGame />, root);
}

function Tile(props){
    var showVal = props.display ? props.value : '';
    return(
        <button className="square" onClick={props.onClick}>
    		{showVal}
        </button>
        );
}

function initialState(){
	return[
	{value:'G', display: false},
	{value:'F', display: false},
	{value:'D', display: false},
	{value:'H', display: false},
	{value:'A', display: false},
	{value:'B', display: false},
	{value:'E', display: false},
	{value:'D', display: false},
	{value:'G', display: false},
	{value:'E', display: false},
	{value:'H', display: false},
	{value:'A', display: false},
	{value:'B', display: false},
	{value:'C', display: false},
	{value:'F', display: false},
	{value:'C', display: false},
	];
}

class MemoryGame extends React.Component {
  constructor(props) {
      super(props);
      this.reset = this.reset.bind(this);
    this.state = {
	  tiles: initialState(),
	  openTile: -1,
	      matches: 0,
        clicks: 0,
        clickDisable: false
	};
  }

    

    handleClick(i){
        if(!this.state.clickDisable && !this.state.tiles[i].display){
      if(this.state.openTile == -1){
	        var tiles = this.state.tiles;
          tiles[i].display = true;
          var clicks = this.state.clicks+1;
          this.setState({tiles:tiles,openTile: i,clicks:clicks});
      }else if(i!=this.state.openTile){
          if(this.state.tiles[i].value == this.state.tiles[this.state.openTile].value){
              var tiles = this.state.tiles;
              var matches = this.state.matches+1;
              tiles[i].display = true;
              var clicks = this.state.clicks+1;
              this.setState({tiles:tiles,openTile:-1,matches:matches,clicks:clicks});
          }else{
              var tiles = this.state.tiles;
              var clicks = this.state.clicks+1;
              var openTile = this.state.openTile;
              tiles[i].display = true;
              setTimeout(()=>{
                  tiles[i].display = false;
                  tiles[openTile].display = false;
                  this.setState({tiles:tiles,openTile: -1,clicks:clicks,clickDisable:false});
              },1000);
              this.setState({tiles:tiles,clickDisable:true});
          }

          }
      }
    }

    renderTile(i){
        return(
            <Tile
                index={i}
                display={this.state.tiles[i].display}
	  	value={this.state.tiles[i].value}
		onClick={()=>this.handleClick(i)}
	    />
        );
    }
    reset(){
        this.setState({
tiles: initialState(),
	  openTile: -1,
	      matches: 0,
        clicks: 0,
        clickDisable: false
        });
    }
    render() {
        var label = "Moves";
        var moves = this.state.clicks;
        if(this.state.matches==8){
            label = "Game Over! Your Score";
        }
      return (
          <div className="container">
             <div className="row">
               {this.renderTile(0)}
               {this.renderTile(1)}
               {this.renderTile(2)}
               {this.renderTile(3)}
             </div>
	     <div className="row">
               {this.renderTile(4)}
               {this.renderTile(5)}
               {this.renderTile(6)}
               {this.renderTile(7)}
             </div>
	     <div className="row">
               {this.renderTile(8)}
               {this.renderTile(9)}
               {this.renderTile(10)}
               {this.renderTile(11)}
             </div>
	     <div className="row">
               {this.renderTile(12)}
               {this.renderTile(13)}
               {this.renderTile(14)}
               {this.renderTile(15)}
       </div>
       <div className="row large-text">
           {label} : {moves}
       </div>
       <div className="row">
           <button className="btn-warning" onClick={this.reset}>Reset Game</button>
       </div>
          </div>
    );
  }
}

