import React from 'react';
import Image from './Image';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');

var styles = {
	"display": "list-item",
	"2position": "absolute",
	top: "0px",
	left: "72px"
}

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount
} = ShareCounts;


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
				
				var shareUrl = article.url;
				var title = article.title;


				return(
				<li key={key}>
					<Image item={article}/>
					<div className="post-basic-info">
						<h3><a target="_blank" href={article.url}>{article.title}</a></h3>
						<span><a href="#"><label> </label>{article.team}</a></span>
						<p>{article.description}</p>
						<div className='Demo_container'>
							<div className='Demo__some-network'>
								<FacebookShareButton
						            url={shareUrl}
						            title={title}
						            className="Demo__some-network__share-count">
					            <FacebookIcon
					              size={32}
					              round={true} />
						        </FacebookShareButton>
						        <FacebookShareCount
				                    url={shareUrl}
				                    className="Demo__some-network__share-count">
				                    {count => count}
				                </FacebookShareCount>
				            </div>

				            <div className='Demo__some-network'>
				                <GooglePlusShareButton
						            url={shareUrl}
						            title={title}
						            className="Demo__some-network__share-count">
					            <GooglePlusIcon
					              size={32}
					              round={true} />
						        </GooglePlusShareButton>
						        <GooglePlusShareCount
				                    url={shareUrl}
				                    className="Demo__some-network__share-count">
				                    {count => count}
				                </GooglePlusShareCount>
				            </div>

				            <div className='Demo__some-network'>
				                <TwitterShareButton
						            url={shareUrl}
						            title={title}
						            className="Demo__some-network__share-count">
					            <TwitterIcon
					              size={32}
					              round={true} />
						        </TwitterShareButton>
						     </div>  

						     <div className='Demo__some-network'>
				                <PinterestShareButton
						            url={shareUrl}
						            media={article.iurl}
						            title={title}
						            className="Demo__some-network__share-count">
					            <PinterestIcon
					              size={32}
					              round={true} />
						        </PinterestShareButton>
						        <PinterestShareCount
				                    url={shareUrl}
				                    media={article.iurl}
				                    className="Demo__some-network__share-count">
				                    {count => count}
				                </PinterestShareCount>
				             </div>
		                </div>
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