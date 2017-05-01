import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Input from './components/Input.jsx';
import Selecter from './components/Selecter.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      brokenLinks: [],
      scrapedSites: [],
      haveSelected: false
    };
  }

  componentDidMount() {    
    $.ajax({
      url: '/websites', 
      success: (data) => {
        data.unshift('Choose a website');
        this.setState({
          scrapedSites: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  select(website) {
    $.ajax({
      url: '/links/' + website + '/', 
      success: (data) => {
        this.setState({
          brokenLinks: data,
          haveSelected: true
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  submit(url) {
    $.ajax({
      method: "POST",
      url: '/search', 
      data: { searchUrl: `${url}` },
      success: (data) => {
        console.log('Post was successfull!');
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    var isClicked = this.state.haveSelected;

    return (<div>
      <h1 class="gay">Hedgly - Find Broken Links</h1>
      <Input onSubmit={this.submit.bind(this)}/>
      <Selecter onChange={this.select.bind(this)} websites={this.state.scrapedSites}/>

      {isClicked ? (
        <List brokenLinks={this.state.brokenLinks}/>
      ) : (
        <div></div>
      )}

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));