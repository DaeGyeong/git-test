import React,{Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class MakeItem extends Component{
    render(){
        return (
            <div style={{border:'solid 1px #d4e0ef'}} className="box person">
                    <div className="image round">
                        <img className="img" alt= "" src={this.props.movieImg}  />       
                    </div>
                    <p style={{textAlign:'center'}} className="p">{this.props.movieTitle}</p>
                    
            </div>
        )
    }
}

class Movies extends Component {
    componentDidMount() {
        this._getITBooks();
      }

      _getITBooks = async () => {
        const itemList = await this._callApi();
        this.setState({
            itemList
        });
      };

      _callApi = () => {
        return fetch('/books/movie')
          .then(res => res.json())
          .then( json => {
              return json
          })
          .catch(err => console.log(err));
      };


    constructor(props) {
        super(props);
        this.state = {
          itemList:[]
        };
      }
    render(){
        return(
            <section id="three" className="section wrapper">
			
            <div className="inner">
            <header className="align-center header">
                    <h2 className="h2">Movies</h2>
					<p className="p">Popular movies from torrents</p>
            </header>
            <div className="flex flex-4">
                    {this.state.itemList.length!==0?(this.state.itemList.map( 
                        (item, idx) => {
                            return (
                                <MakeItem 
                                    key={idx} 
                                    movieTitle={item.title}
                                    movieImg={item.img} 
                                />
                            );
                        }
                    )):(<CircularProgress style={{margin:'auto'}}></CircularProgress>)
                }
                
            </div>
        </div>
        	
			</section>
        );
    }
}
export default Movies;