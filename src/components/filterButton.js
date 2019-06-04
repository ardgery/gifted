import React from 'react';
import FilterImage from '../assets/images/filter-results-button.png';

class FilterButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gifDatas:[],
			gifFilter:"trending",
			filterShow:false,
			isTrending:true
		};
		this.filterClick = this.filterClick.bind(this);
	}

	hideShowFilter(){
	  	if(this.state.filterShow){
	  		this.setState({filterShow:false})
	  	}else{
	  		this.setState({filterShow:true})
	  	}
	}

	filterClick(par1, par2){
	  	const {onClickSearch} = this.props;
		this.hideShowFilter();	

		if(par1==="fromList"){
			this.setState({gifFilter:par2==="2"?"random":"trending",isTrending:par2==="2"?false:true},()=>{
				onClickSearch(this.state.gifFilter,"fromList");
			})
		}else{
			onClickSearch(this.state.gifFilter,"fromBurgerMenu");
		}
	}

	
	render() {
		return (
			<div className={this.state.filterShow?"feature filterFeature active":"feature filterFeature"}>
				<div className="mainFilterWrap">
					<img src={FilterImage} alt="" onClick={()=>{this.filterClick()}} />
					<ul className={this.state.filterShow?"filterList active":"filterList"}>
						<li className={this.state.isTrending?"active":""} onClick={()=>{this.filterClick("fromList","1")}}>Trending GIF</li>
						<li className={this.state.isTrending?"":"active"}onClick={()=>{this.filterClick("fromList","2")}}>Random GIF</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default FilterButton;