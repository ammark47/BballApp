import React from 'react';
import Image from './Image';
import SocialSharing from './SocialSharing';


var styles = {
	"display": "list-item",
	"2position": "absolute",
	top: "0px",
	left: "72px"
}


class BasicInfo extends React.Component {
		constructor(props, context) {
	    super(props, context);
	    this.handleClick = this.handleClick.bind(this);

	  }

	handleClick(e, link){
		e.preventDefault();
		console.log(e);
		console.log(e.defaultPrevented); //returning false

		
	}


	render() {
		var article = this.props.article;




		
		article.sort(function(a, b){
			return b.timeStamp - a.timeStamp;
		});

		var articleNodes = article.map(function(article, key){
				if (article.pubDate != null){

						if (article.enclosure != null){
							var pic = article.enclosure.link;
						} else {
							var pic = "basketball.jpg";
						};
						
						
						var shareUrl = article.link;
						var title = article.title;
						
		
						if(description !== undefined){
							var description = article.description;
							description = description.replace(/&amp;/g, "").replace(/#039;/g, "'").replace(/quot;/g, '"').replace(/amp;/g, "&");
						}

						
						title = title.replace(/&amp;/g, "").replace(/#039;/g, "'").replace(/quot;/g, '"').replace(/amp;/g, "&");
						

						return(
						<li key={key} onClick={this.handleClick(event, shareUrl)}>
							<Image pic={pic}/>
							<div className="post-basic-info">
								<h3><a target="_blank" href={article.link}>{title}</a></h3>
								
								<p>{article.description}</p>
								<SocialSharing shareUrl={shareUrl} title={title} pic={pic} />
							</div>
						</li>
						)
				} else {
					var pic = article.iurl;
						if(pic == ""){
							pic = "basketball.jpg";
						};
					
						
						var shareUrl = article.url;
						var title = article.title;


						return(
						<li key={key}>
							<Image pic={pic}/>
							<div className="post-basic-info">
								<h3><a target="_blank" href={article.url}>{article.title}</a></h3>
								<span><a href="#"><label> </label>{article.team}</a></span>
								<p>{article.description}</p>
								<SocialSharing shareUrl={shareUrl} title={title} pic={pic} />
							</div>
						</li>
						)
				}		
			}.bind(this));
		return(
				<div>
					{articleNodes}
				</div>
			)
	}
}


export default BasicInfo;