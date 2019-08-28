import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  static defaultProps = {
    open:false,
    maxWidth: 'xs',
    fullWidth: true,
}
  render() {
    const {button,...other} = this.props;
    return (
        <Dialog
         fullWidth={other.fullWidth}
          maxWidth={other.maxWidth}
          onClose={other.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          open={other.open}
        >
          {(this.props.title&&<DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>)}
          
          <DialogContent>
            {
              (typeof(this.props.contents)=="string")?( <DialogContentText id="alert-dialog-description">
              {this.props.content}
            </DialogContentText>): this.props.content
            }
          </DialogContent>
          {(button&&button.length>0&&Array.isArray(button))?(<DialogActions>
            {
                button.map((n,i) => {
                    return (
                    <Button key={i} onClick={n.func} color="primary">
                    {n.name}
                  </Button>)
                })
            }
          </DialogActions>):''}
          
        </Dialog>
    );
  }
}
export default AlertDialog;