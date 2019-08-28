import React,{Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class MakeItem extends Component{
   
    render(){
        return (
            <div className="box person">
                    <div className="image round">
                        <img className="img" alt= "" src={this.props.bookImg}  />
                    </div>
                    <p className="p"> {this.props.bookName}</p>
                    {//<p className="p">{this.props.bookDesc}</p> 
                    }
            </div>
        )
    }
}

class RecommendBook extends Component {


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
        return fetch('/books/it')
          .then(res => res.json())
          .then( json => {
              json = json.reverse().slice(0,4)
              json.forEach(element => {
                element.bookName=element.title.substr(0,element.title.indexOf("("))
                element.bookDesc=element.title.substr(element.title.indexOf("("))
               });

              return json
          })
          .catch(err => console.log(err));
      };


    constructor(props) {
        super(props);
        this.monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"]
        this.weekNames = ["first", "second", "third", "forth", "last"]
        this.date = new Date();
        this.state = {
          itemList:[],
          monthWeek: "The "+this.monthNames[this.date.getMonth()]+" week of "+this.weekNames[Math.ceil(this.date.getDate() / 7)-1]+"."
        }
    
      }
    render(){
        return(
            <section id="two" className="section wrapper style1 special">
			
            <div className="inner">
            <header className="header">
                    <h2 className="h2">Recommended Books</h2>
					<p className="p"> IT Best Seller</p>
                    <p className="header"> {this.state.monthWeek}</p>
            </header>
            <div className="flex flex-4">
                    {this.state.itemList.length!==0?(this.state.itemList.map( 
                        (item, idx) => {
                            return (
                                <MakeItem 
                                    key={idx} 
                                    bookName={item.bookName}
                                    bookDesc={item.bookDesc}
                                    bookImg={item.img} 
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
export default RecommendBook;