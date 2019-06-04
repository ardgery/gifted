import React from 'react';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import PlayButton from '../assets/images/play-button.png';
import LoadingImage from '../assets/images/loadData.gif';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';

let GphApiClient = require('giphy-js-sdk-core');
let client = GphApiClient("QS0opp8JtNGvpx3NPwEtA6LnXV248WUC");
let pauseIndex = [], pauseImgHeight = [];

class GifList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gifDatas:[],
			query:"",
			onSearch:false,
			limit:100,
			offset:0,
			totalDatas:12,
			paging:true,
			activePage:1,
			screen:'mobile',
			pageDivide:12,
			loadingData:false,
			pauseHeight:[],
			pauseArray:[]
		};
		this.gifClick = this.gifClick.bind(this);
		this.pauseImgClick = this.pauseImgClick.bind(this);
	}

	// isBottom(el) {
	//   return el.getBoundingClientRect().bottom <= window.innerHeight;
	// }

	// componentDidMount() {
	//   document.addEventListener('scroll', this.trackScrolling);

	// }

	// componentWillUnmount() {
	//   document.removeEventListener('scroll', this.trackScrolling);
	// }

	// trackScrolling = () => {
	//   const wrappedElement = document.getElementById('contentWrap');
	//   if (this.isBottom(wrappedElement)) {
	//     document.removeEventListener('scroll', this.trackScrolling);
	//   }
	// };

	componentWillMount(){
		this.setState({loadingData:true});
		client.trending("gifs", {"limit": 100})
		  .then((response) => {
		  	this.setState({gifDatas:response.data,totalDatas:(this.state.totalDatas===12?100:response.data.length)},()=>{
		  		this.setState({loadingData:false})
		  	})
		  })
		  .catch((err) => {

		})	
	}

	componentDidMount(){
   		const { current } = this.ref;
    	console.log(current.offsetHeight);
	}

	componentWillReceiveProps({query}) {
		let fixQuery;
		if(query===""){
			fixQuery="trending";
		}else{
			fixQuery=query;
		}
		this.setState({loadingData:true});

		// console.log("WINDOW WIDTH = ",window.$(window).width());
		// console.log("WINDOW WIDTH FROM REACT = ",window.innerWidth);

		if(window.innerWidth>600){
			this.setState({screen:'desktop',pageDivide:12});
		}else{
			this.setState({screen:'mobile',pageDivide:25});
		}
	   this.setState({
	   		query:fixQuery,
	   		limit:12,
	   		onSearch:true
	   } ,()=>{
	   		this.searchGif(this.state.query,this.state.limit,this.state.offset);
	   });
	}

	searchGif(query,limit,offset){
		client.search('gifs', {"q": query, "limit": limit, "offset": offset})
		  .then((response) => {
		  	this.setState({gifDatas:response.data},()=>{this.setState({loadingData:false})});
		  })
		  .catch((err) => {
		})
	}

	pageClick(clickedPage){
		this.setState({loadingData:true});
		let lastPage=Math.ceil((this.state.totalDatas/this.state.pageDivide)+1);
		let setOffset=(clickedPage-1)*this.state.pageDivide;

		if(clickedPage===0){
			if(this.state.activePage>=2){
				this.setState({activePage:this.state.activePage-1},()=>{
					this.setState({paging:true,offset:(this.state.offset-this.state.pageDivide)},()=>{
						this.searchGif(this.state.query,this.state.limit,this.state.offset);
					});
				});
			}else{
				this.setState({paging:true});
			}
		}else if(clickedPage===lastPage){
			if(this.state.activePage<=(lastPage-2)){
				this.setState({activePage:this.state.activePage+1},()=>{
					this.setState({paging:true,offset:(this.state.offset+this.state.pageDivide)},()=>{
						this.searchGif(this.state.query,this.state.limit,this.state.offset);
					});
				});
			}else{
				this.setState({paging:true});
			}
		}else{
			this.setState({paging:true,activePage:clickedPage,offset:setOffset},()=>{
				this.searchGif(this.state.query,this.state.limit,this.state.offset);
			});
		}
	}

	paginationRender(){
		let content=[],borderFix, countPage, valueList;
		countPage=Math.ceil(this.state.totalDatas/this.state.pageDivide);
		for(let i=0;i<countPage+2;i++){
			valueList=i;

			if(i>=1 && i<=countPage+2){
				borderFix="paginationResult nonBorderLeft"
				if(i===countPage+1){
					valueList=">";
				}else if(i===1){
					borderFix="paginationResult nonBorderLeft";
				}
			}else{
				valueList="<";
				borderFix="paginationResult";
			}

			content.push(
				<li key={i} className={borderFix+(this.state.activePage===i?" active":"")} onClick={ ()=> this.pageClick(i) }> {valueList} </li>
			);
		}

		return content;
	}


	gifClick({target:img}){
		let indexImg = parseInt(img.className.replace(/\D/g,''));
		console.log("IMG HEIGHT = ",img.height);


		if(pauseIndex.indexOf(indexImg) === -1){
			pauseIndex.push(indexImg.toString());
			// pauseImgHeight.push(img.height+'-'+indexImg);
			pauseImgHeight.push(img.height+'-'+indexImg);
		}	

		
		this.setState({
			pauseArray:pauseIndex,
			pauseHeight:pauseImgHeight
		},()=>{
			let str = this.state.pauseHeight;
			console.log("PAUSE ARRAY AFTER STATE =",this.state.pauseArray);
			console.log("PAUSE ARRAY LENGTH AFTER STATE =",this.state.pauseArray.length);
			console.log("PAUSEHEIGHT AFTER STATE =",this.state.pauseHeight);
			console.log("SPLITED STRING = ",this.state.pauseHeight[0].split('-')[1]);
		})
		// this.setState({pauseIndex:})
		// let classEle = window.$("."+img.attributes.class.value);
		// let widthEle = classEle.width();
		// let heightEle = classEle.height();
		// if(classEle.length){
		// 	classEle.hide();
		// 	classEle.parent(window.$('.imgWrap')).prepend(
		// 		`<div 
		// 			class="imgPause" 
		// 			style="width:`+widthEle+`px; height:`+heightEle+`px; background:#000; position:relative ">
		// 				<img src="`+PlayButton+`" class="centerAbsoluteImage" />
		// 		</div>`);
		// }

		// window.$(classEle.parent()).on('click', '.imgPause', function() {
		// 	classEle.show();
		// 	classEle.parent().find('.imgPause').remove();
		// })
	}

	pauseImgClick = (par) =>{
		console.log("PAAARRRR = ",par);
		var str = this.state.pauseArray.indexOf(par);
		if (str > -1) {
		  this.state.pauseArray.splice(str, 1);
		  // console.log("SPLICED ARRAYYY = ",this.state.pauseArray)
		  // console.log("STATE PAUSE ARRAY = ",this.state.pauseArray)
		  this.setState({pauseArray:this.state.pauseArray},()=>{
		  	console.log("STATE PAUSE ARRAY = ",this.state.pauseArray)
		  });
		}
		
		
	}


	render() {	
		const {pauseImgClick} = this.props
		console.log("RERENDEEERRRRRR");		
		return (
			<div className="contentWrap" ref={this.paneDidMount}>
			    {
			        this.state.onSearch?
			      		<div className="paginationWrap topPagination">
			      			{
			      				<ul className="paginationBox">
			      					{	
			      						this.state.paging?this.paginationRender():null
			      					}
			      				</ul>
			      			}
			      		</div>
			        : null
			    }
			    {
			    	this.state.loadingData?
			    		<div className="wrapperLoad">
							<img src={LoadingImage} alt="" onClick={this.filterClick}/>
						</div>
					:
						<div className="gifBoxWrap">
							{ 
						        [0, 1, 2, 3].map((n) =>
							        <div 
								        className={
								        	(n+1)%4===0?
								        			((n+1)%2===0?"gifBoxColumn evenColumn lastColumn":"gifBoxColumn lastColumn")
								        		:
								        			((n+1)%2===0?"gifBoxColumn evenColumn":"gifBoxColumn")
								        } 
								        key={n} 
								        data-key={n}>
							            {
						            		this.state.gifDatas.map((f, i) => 
								                4 * i + n < this.state.gifDatas.length ? 
									              	<div className="imgWrap" key={i}>
														{
															this.state.pauseArray[i]!==undefined?
																this.state.pauseArray[i].includes((4 * i + n).toString())?
																	<div 
																		className="imgPause"
																		style={{
																			width:'100%',
																			height:this.state.pauseHeight[i].split('-')[0]+'px',
																			background:'#000',
																			position:'relative'
																		}}
																		onClick={()=>this.pauseImgClick(4 * i + n)}
																		>
																			<img 
																				src={PlayButton} 
																				className="centerAbsoluteImage" 
																				alt=""
																				width="100%" />
																	</div>
																:
																<LazyLoadImage 
																	key={i} 
																	src={this.state.gifDatas[4 * i + n].images.downsized.url} 
																	alt="" 
																	width="100%" 
																	className={"img"+(4 * i + n)}
																	id={"image"+(4 * i + n)}
																	effect="opacity"
																	onClick={this.gifClick}
																	index={4 * i + n}
																/>
															: 
																<LazyLoadImage 
																	key={i} 
																	src={this.state.gifDatas[4 * i + n].images.downsized.url} 
																	alt="" 
																	width="100%" 
																	className={"img"+(4 * i + n)}
																	id={"image"+(4 * i + n)}
																	effect="opacity"
																	onClick={this.gifClick}
																	index={4 * i + n}
																	ref={this.ref}
																/>
														}
									              	</div>
								                : ""
									        )
							            }
							        </div>
						        )
							}
						</div>
			    }
			    {
			        this.state.onSearch?
			      		<div className="paginationWrap">
			      			{
			      				<ul className="paginationBox">
			      					{	
			      						this.state.paging?this.paginationRender():null
			      					}
			      				</ul>
			      			}
			      		</div>
			        : null
			    }
			</div>
		)
	}
}

export default GifList;