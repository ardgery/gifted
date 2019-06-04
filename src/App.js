import React from 'react';
import GiftedLogo from './assets/images/giftedLogo.png';
import FilterButton from './components/filterButton';
import SearchBar from './components/searchBar';
import ThemeChanger from './components/themeChanger';
import GifList from './components/gifList';
import TestComp from './components/testComp';

let GphApiClient = require('giphy-js-sdk-core');
let client = GphApiClient("QS0opp8JtNGvpx3NPwEtA6LnXV248WUC");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPagination:false,
      query:"",
      filteringGif:""
    };
    this.onClickSearch = this.onClickSearch.bind(this);
  }

  componentWillMount(){
      client.trending('gifs', {"limit":100})
        .then((response) => {
          response.data.forEach((gifObject) => {
          })
        })
        .catch((err) => {

      })
  }

  onClickSearch(par1,par2){
    if(par2==="fromList" || par2==="fromSearch"){
      this.setState({ query:par1 })
    }
  }

  render() {
    return (
      <div className="mainContainer lightTheme">
      	<section className="header">
	        <div className="companyLogo">
              <img src={GiftedLogo} alt="" />
              <h1>by GERY~</h1>
          </div>
	        <div className="featureWrap">
            {
               // <TestComp />
            }
	        	<FilterButton onClickSearch={this.onClickSearch} />
	        	<SearchBar items={this.state.list} delete={this.removeItem} onClickSearch={this.onClickSearch} />
	        	<ThemeChanger />
	        </div>
      	</section>
      	<section className="content" id="contentWrap">
      		<GifList query={this.state.query} />
      	</section>
      	<section className="footer">
          <p className="footerText">Copyright by &#9400; SYALALA~</p>
      	</section>
      </div>
    )
  }
}

export default App;