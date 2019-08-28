import React,{Component} from 'react';
import Login from '../login/login'
class SectionOne extends Component {
    
    render(){
        return(
            <section id="one" className="section wrapper">

        <div  className="inner">
            <div className="flex flex-3">
                <Login></Login>
                <article className="article">
                    <header className="header">
                        <h3 className="h3">Interdum lorem pulvinar<br /> adipiscing vitae</h3>
                    </header>
                    <p className="p">Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu.</p>
                    <footer className="footer">
                        <a href="aa" className="a button special">More</a>
                    </footer>
                </article>
                <article className="article">
                    <header className="header">
                        <h3 className="h3">Libero purus magna sapien<br /> sed ullamcorper</h3>
                    </header>
                    <p className="p">Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu.</p>
                    <footer className="footer">
                        <a href="aa" className="a button special">More</a>
                    </footer>
                </article>
            </div>
        </div>
        			
			</section>
        );
    }
}
export default SectionOne;