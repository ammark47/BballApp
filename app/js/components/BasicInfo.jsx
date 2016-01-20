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

	  }


	render() {
		var article = this.props.article;




		
		article.sort(function(a, b){
			return b.date - a.date;
		});

		var articleNodes = article.map(function(article, key){
				if (article.enclosure != null){
						var pic = article.enclosure.link;
						if(article.enclosure.link == ""){
							article.enclosure.link = "basketball.jpg";
						};
			
						
						var shareUrl = article.link;
						var title = article.title;
						title = title.replace(/&amp;/g, "").replace(/#039;/g, "'").replace(/quot;/g, '"');
						

						return(
						<li key={key}>
							<Image pic={pic}/>
							<div className="post-basic-info">
								<h3><a target="_blank" href={article.link}>{title}</a></h3>
								<span><a href="#"><label> </label>{article.team}</a></span>
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
			});
		return(
				<div>
					{articleNodes}
				</div>
			)
	}
}


export default BasicInfo;