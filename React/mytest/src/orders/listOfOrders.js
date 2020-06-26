import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import './orders.css';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Input from '@material-ui/core/Input';
import { useForm } from "react-hook-form";
import { InputLabel } from '@material-ui/core';
import {updateOrder} from '../actions'
const styles = (theme) => ({
  rootD: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-around',
  //   overflow: 'hidden',
  //   marginTop: 20,
  // },
  root: {
    width: '60%',
    backgroundColor: "rgb(253, 199, 133)",
    marginLeft: "20%",
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  gridList: {
    width: 1000,
    height: 790,

    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: '#FF8C00',
  },
  paper: {
    padding: theme.spacing(2),
    width: 900,
    flexGrow: 1,
    height: 400,
  },
  orderText: {
    marginLeft: "40%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,
  },
  text: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export default function AdvancedGridList() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { handleSubmit ,register} = useForm();
  const onSubmit = values =>{
    console.log(values);
    updateOrder(values , function(res){
      console.log(res.data.message);
      if(res.data.message.match('updated'));
        window.location.reload();
    })
  } 
  const [EditData, setEditData] = React.useState({
    amount: 0,
    created: "",
    kind: "",
    name: "",
    note: "",
    orderDate: "",
    orderRecivedDate: "",
    paid: "",
    price: 0,
    user_id: "",
    _id: "",

  });
  const handleClickOpen = (value) => {
    
    const newValues = { ...EditData };
    newValues.amount = value.amount;
    newValues.kind = value.kind;
    newValues.name = value.name;
    newValues.paid = value.paid;
    newValues.orderDate = value.orderDate;
    newValues.orderRecivedDate = value.orderRecivedDate;
    newValues._id = value._id;
    newValues.price = value.price;
    setEditData(newValues);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('honey_token');
      const user_id = localStorage.getItem("id");
      console.log("hhhhhhhhhhhhh")
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const result = await axios({
        headers: {
          'content-type': 'application/json',
        },
       // params:{Origin:"*"},
        method: 'get',
        url: `http://localhost:3400/api/myroutes/Order/${user_id}`,
      });
      //console.log(result.data.element);

      setData(result.data.element);
    };

    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      {data.map((tile, index) => (
        <ExpansionPanel expanded={expanded === index.toString()} onChange={handleChange(index.toString())}
          style={{ backgroundColor: "white" }}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography gutterBottom className={classes.heading}>الأسم: {tile.name}</Typography>
            <Typography className={classes.secondaryHeading}> الكمية:  {tile.amount}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.orderText}>
            <Typography variant="h5" gutterBottom className={classes.paper}>
              الأسم: {tile.name}<br />
              الكمية:  {tile.amount}<br />
               النوع: {tile.kind}<br />
               السعر: {tile.price}<br />
               تاريخ الطلب: {tile.orderDate}<br />
               تاريخ التسليم: {tile.orderRecivedDate}<br />
              {tile.paid}
              <h5 dangerouslySetInnerHTML={{ __html: tile.note }}></h5>
            </Typography>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button variant="contained" color="primary" style={{ marginRight: '800px' }}
              onClick={() => handleClickOpen(tile)}
            >Edite</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      ))}
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <form className={classes.text} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
             <InputLabel htmlFor="my-input">name</InputLabel>
              <Input name="name" type="text" id="outlined-basic" label="name" variant="outlined" inputRef={register} />
              <InputLabel htmlFor="my-input">amount</InputLabel>
              <Input name="amount" type="number" id="outlined-basic" label="amount" variant="outlined" inputRef={register} />
              <InputLabel htmlFor="my-input">kind</InputLabel>
              <Input name="kind" type="text" id="outlined-basic" label="kind" variant="outlined" inputRef={register} />
              <InputLabel htmlFor="my-input">orderDate</InputLabel>
              <Input name="orderDate" type="date" id="outlined-basic" label="orderDate" variant="outlined" inputRef={register} />
              <InputLabel htmlFor="my-input">paid</InputLabel>
              <Input name="paid" type="text" id="outlined-basic" label="paid" variant="outlined" inputRef={register} />
              <InputLabel htmlFor="my-input">price</InputLabel>
              <Input name="price" type="number" id="outlined-basic" label="price" variant="outlined" inputRef={register} />
              <InputLabel htmlFor="my-input">orderRecivedDate</InputLabel>
              <Input name="orderRecivedDate" type="date" id="outlined-basic" label="orderRecivedDate" variant="outlined" inputRef={register} />
              <InputLabel htmlFor="my-input">_id</InputLabel>
              <Input name="_id" type="text" value={EditData._id} id="outlined-basic" label="" variant="outlined" inputRef={register} />
              <Button variant="contained" type="submit" autoFocus  color="primary">
                Save changes
              </Button>
            </form>
          </Typography>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleClose}  color="primary">
                Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
