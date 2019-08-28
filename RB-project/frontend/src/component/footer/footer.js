import React, { Component } from 'react';


class Footer extends Component {
  render() {
    return (
			<footer id="footer" className="footer">
				<div className="inner">
					<div className="flex">
						<ul className="icons ul">
							<li className="li"><a href="." className="a icon fa-facebook"><span className="span label">Facebook</span></a></li>
							<li className="li"><a href="." className="a icon fa-twitter"><span className="span label">Twitter</span></a></li>
							<li className="li"><a href="." className="a icon fa-linkedin"><span className="span label">linkedIn</span></a></li>
							<li className="li"><a href="." className="a icon fa-pinterest-p"><span className="span label">Pinterest</span></a></li>
							<li className="li"><a href="." className="a icon fa-vimeo"><span className="span label">Vimeo</span></a></li>
						</ul>
						<div className="copyright">
							&copy; 2019 ReadBear
						</div>
					</div>
				</div>
			</footer>
      
    );
  }
}

export default Footer;
