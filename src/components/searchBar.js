import React from 'react';
import Logo from '../assets/images/search-icon.svg';

let GphApiClient = require('giphy-js-sdk-core');
let client = GphApiClient("QS0opp8JtNGvpx3NPwEtA6LnXV248WUC");

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filtered: [],
			searchStrings:[],
			searchQuery:""
		};
		this.handleChange = this.handleChange.bind(this);
	}

   handleChange(e) {
	    let currentList = [];
	    let newList = [];
	    let realList = [];
	    let search_term = "";
	    let searched;
	    this.setState({searchQuery:e.target.value},()=>{
	    	searched=this.state.searchQuery;
	    });
		client.search('gifs', {"q": searched})
		  	.then((response) => {
		    	response.data.forEach((gifObject,index) => {
		    		currentList.push(gifObject);
		    		newList.push(currentList[index].slug.replace(/-/g, ' ').replace(currentList[index].id,'').trim());

		    		if(newList[index]===search_term){
		    			newList.splice(index, 1);

					    if (searched !== "") {
					        currentList = newList;
					        realList = currentList.filter(item => {
						        const lc = item.toLowerCase();
						        const filter = searched.toLowerCase();
						        return lc.includes(filter);
					      	});
					    } else {
					      realList = [];
					    }

		    			this.setState({filtered:realList})
		    		}
		    	})
		  	})
		  	.catch((err) => {

	    	})
  }

  searchItem(){
  	const {onClickSearch} = this.props;
  	onClickSearch(this.state.searchQuery,"fromSearch");

  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.searchItem();
    }
  }
	render() {
		return (
			<div className="feature searchFeature">
				<div className="searchBox">
					<div className="inputSearchWrap">
						<input type="text" className="input searchInput" onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Search GIF..." />
					</div>
					<div className="searchLogoWrap" onClick={()=>{this.searchItem()}}>
						<img src={Logo} alt="searchlogo" className="searchLogo" />
					</div>
				</div>
				<div className="searchResultWrap">
					<ul className="searchResult">
						{
		                     this.state.filtered
		                     .filter(index => index<4)
		                     .map((item,index) => {
		                         return(
									<li className="resultList" key={index}>
										{item}
									</li>
		                         )
		                    })
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default SearchBar;