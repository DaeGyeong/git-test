import React,{Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { connect } from "react-redux";
import { changeStatus } from "../../modules/login";
import {Redirect} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

function createData(no, title, creator, date) {
  return { id: no, no, title, creator, date };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

// const rows = [
//   { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
//   { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//   { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//   { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//   { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
// ];
const rows = [
  //{ id: 'no', numeric: false, disablePadding: false, label: 'no' },
  { id: 'title', numeric: false, disablePadding: false, label: 'title' },
  { id: 'creator', numeric: false, disablePadding: false, label: 'creator' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Reg_date' }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {  order, orderBy} = this.props;

    return (
      <TableHead>
        <TableRow>
          
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const {  classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root)}
    >
      <div 
                  style={{width:'100%'}} className={classes.title}>
        
          <Typography style={{display:'inline-flex',width:'100%'}} variant="h6" id="tableTitle">
            <p style={{width:'100%',marginBottom:'auto',marginTop:'auto'}}>LIST</p>
            <Tooltip title="New"><IconButton onClick={props.create} > <Icon color="primary">add_circle</Icon></IconButton></Tooltip>
           
          </Typography>
          
      
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
      width: '90%',
      marginLeft:'auto',
      marginRight:'auto',
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3
    },
    // table: {
    //   minWidth: 1020,
    // },
    tableWrapper: {
      overflowX: 'auto',
    },
  });
  

class EnhancedTable extends Component {
    state = {
      boardStatus:'ready',
      viewName:'detail',
      goDetail :false,
      detailId:'',
      order: this.props.order,
      orderBy: this.props.orderBy,
      data: [
      ],
      page: this.props.page,
      rowsPerPage: 5,
    };
    componentWillReceiveProps(nextProps){
      if(nextProps.login===true){
        this.setState({boardStatus:'ready'})
        this._getBoardList();
      }
    }
  
    componentDidMount() {
        this._getBoardList();      
    }

      _getBoardList = async () => {
        let BoardList = await this._callApi();
        if(BoardList!==null&&BoardList.length!==0&&BoardList!==undefined&&Array.isArray(BoardList)){
          BoardList=BoardList.reduce((prev,curr) => {
              prev.push(createData(curr.id,curr.title,curr.creator.username,curr.created_at.substring(0,10)));
              return prev;
          },[]);
          this.setState({
          data: BoardList,
          boardStatus:'done'
          });
        }
        
      };

      _callApi = () => {
        return fetch("/board/public", {
            method: "GET",
            headers: {
			'Authorization': 'jwt '+localStorage.token
              }
            
        })
          .then(res => res.json())
          .then( json => {
              return json
          })
          .catch(err => console.log(err));
      };
    handleRequestSort = (event, property) => {
      const orderBy = property;
      let order = 'desc';
  
      if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc';
      }
  
      this.setState({ order, orderBy });
    };
  
    handleDoubleClick=(event,id) => {
      this.setState({goDetail:true,detailId:id});
    }

    create=() => {
      this.setState({viewName:'create',goDetail:true});
    }

    handleChangePage = (event, page) => {
      this.setState({ page });
    };
  
    handleChangeRowsPerPage = event => {
      this.setState({ rowsPerPage: event.target.value });
    };
  
    render() {
      const { classes } = this.props;
      const { data, order, orderBy, rowsPerPage, page } = this.state;
      let emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
      if(data.length===0){
        emptyRows=rowsPerPage
      }
      if(this.state.goDetail){
          return(<Redirect to={{pathname:"/blog/detail",state:{page:this.state.page,order:this.state.order,orderBy:this.state.orderBy,viewName:this.state.viewName,id:this.state.detailId}}}></Redirect>)
      }
      else{
        return (

          <Paper className={classes.root}>
            <EnhancedTableToolbar create={this.create}/>
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={this.handleRequestSort}
                />
                <TableBody>
                  {
                    (()=>{
                      if(this.props.login===true){
                        return(
                        stableSort(data, getSorting(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(n => {
                       
                        return (
                          <TableRow
                            hover
                            onClick={event => this.handleDoubleClick(event, n.id)}
                            role="checkbox"
                            tabIndex={-1}
                            key={n.id}
                          >
            
                            <TableCell align="left">{n.title}</TableCell>
                            <TableCell align="left">{n.creator}</TableCell>
                            <TableCell align="left">{n.date}</TableCell>
                          </TableRow>
                        );
                      }))
                      }else{
                        emptyRows=5;
                      }                       
                    })()  
                    
                  }
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell style={{textAlign:'center'}} colSpan={6}>
                        {this.props.login===true?(this.state.boardStatus==='ready'?<CircularProgress/>:''):''}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        );
      }
        
      }
      
    }
  
  
  EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };
 
  const mapStateToProps = ({ login }) => ({
    login:login.login
  });
  
  // **** 함수가 아닌 객체 설정시 자동 bindActionCreators 됨
  const mapDispatchToProps = { changeStatus };
  
  export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
  )(EnhancedTable));
  
