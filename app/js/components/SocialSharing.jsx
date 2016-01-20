import React from 'react';
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

class SocialSharing extends React.Component {
		constructor(props, context) {
	    super(props, context);

	  }

	render() {
		// console.log(this.props.shareUrl);
		
			return (
				<div className='Demo_container'>
										<div className='Demo__some-network'>
											<FacebookShareButton
									            url={this.props.shareUrl}
									            title={this.props.title}
									            className="Demo__some-network__share-count">
								            <FacebookIcon
								              size={32}
								              round={true} />
									        </FacebookShareButton>
									        <FacebookShareCount
							                    url={this.props.shareUrl}
							                    className="Demo__some-network__share-count">
							                    {count => count}
							                </FacebookShareCount>
							            </div>

							            <div className='Demo__some-network'>
							                <GooglePlusShareButton
									            url={this.props.shareUrl}
									            title={this.props.title}
									            className="Demo__some-network__share-count">
								            <GooglePlusIcon
								              size={32}
								              round={true} />
									        </GooglePlusShareButton>
									        <GooglePlusShareCount
							                    url={this.props.shareUrl}
							                    className="Demo__some-network__share-count">
							                    {count => count}
							                </GooglePlusShareCount>
							            </div>

							            <div className='Demo__some-network'>
							                <TwitterShareButton
									            url={this.props.shareUrl}
									            title={this.props.title}
									            className="Demo__some-network__share-count">
								            <TwitterIcon
								              size={32}
								              round={true} />
									        </TwitterShareButton>
									     </div>  

									     
					              
					</div>
				);
	}
}

export default SocialSharing;