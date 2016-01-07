import React from 'react';
import Image from './Image';

var styles = {
	"display": "list-item",
	"2position": "absolute",
	top: "0px",
	left: "72px"
}


class BasicInfo extends React.Component {
		constructor(props, context) {
	    super(props, context);

	  }


	render() {

		var article = this.props.article;
		article.sort(function(a, b){
			return b.date - a.date;
		});

		var articleNodes = article.map(function(article, key){
				if(article.iurl == ""){
					article.iurl = "basketball.jpg";
				};
			
				return(
				<li key={key}>
					<Image item={article}/>
					<div className="post-basic-info">
						<h3><a target="_blank" href={article.url}>{article.title}</a></h3>
						<span><a href="#"><label> </label>{article.team}</a></span>
						<p>{article.description}</p>
					</div>
				</li>
				)
			});
		return(
				<div>
					{articleNodes}
				</div>
			)
	}
}


export default BasicInfo;