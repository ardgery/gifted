import React from 'react';
import ThemeImage from '../assets/images/theme.png';

class ThemeChanger extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLight:true,
			changerShow:false
		};
	}

	hideShowTheme(){
	  	if(this.state.changerShow){
	  		this.setState({changerShow:false})
	  	}else{
	  		this.setState({changerShow:true})
	  	}
	}

	changeFilter(par1,par2){	
		this.hideShowTheme();
		if(par2==="fromList"){
			this.setState({isLight:par1==="1"?true:false},()=>{
				document.getElementById('theme_css').href = par1==="1"?'/assets/css/index.css':'/assets/css/darkTheme.css';
			})
		}
	}
	
	render() {
		let showChanger=this.state.changerShow;
		return (
			<div className={showChanger?"feature themeFeature active":"feature themeFeature"}>
				<div className="mainThemeWrap">
					<img src={ThemeImage} alt="" onClick={()=>{this.changeFilter()}} />
					<ul className={showChanger?"themeList active":"themeList"}>
						<li className={this.state.isLight?"active":""} onClick={()=>{this.changeFilter("1","fromList")}}>Light</li>
						<li className={this.state.isLight?"":"active"} onClick={()=>{this.changeFilter("2","fromList")}}>Dark</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default ThemeChanger;