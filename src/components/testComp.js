import React from 'react';

class TestComp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			arr_one:[1,2,3,4,5],
			arr_two:[1,3,5]
		};
	}


	render() {
		const filteredStyle={
			background:'red'
		}
		return (
			<div className="wrapper">
			{
				this.state.arr_one.map((item,index)=>
					this.state.arr_two.includes(item)?
						<div key={index} className={filteredStyle}>
							<p>Item {item}</p>
						</div>
					: 
						<div key={index}>
							<p>I'm not in filter! {item}</p>
						</div>
				)				
			}

			</div>
		)
	}
}

export default TestComp;