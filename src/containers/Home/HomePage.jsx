import React from 'react';
import { Link } from 'react-router-dom'
import { PrivateRoute } from '../PrivateRoute'
import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton } from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ReportIcon from '@material-ui/icons/Report';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ArchiveIcon from '@material-ui/icons/Archive';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import Report from '../../pages/Report/Report'
import RegistrationForm from "../../pages/RegistrationUsers/RegistrationForm";
import RegisteredTable from "../../pages/RegisteredTable/RegisteredTable";
import Archive from '../../pages/Archive/Archive';
import ArchiveEdit from '../../pages/Archive/ArchiveEdit';
import FileTypesTable from '../../pages/FileTypes/FileTypesTable';
import EditFileType from '../../pages/FileTypes/EditFileTypes';
import EditBranch from '../../pages/AddBranchAndManage/EditBranch';
import UserManagmentTable from '../../pages/UserManagment/UserManagmentTable';
import AddBranchAndManage from '../../pages/AddBranchAndManage/AddBranchAndManage';
import RegisteredFormEdit from '../../pages/RegisteredTable/RegisteredFormEdit';
import MibTable from '../../pages/Mib/MibTable';
import ShowHidden from '../../pages/ShowHidden/ShowHidden';
import CourtTable from '../../pages/Court/CourtTable';

import SideBarBg from '../../assets/img/sideBarBg.svg'
import logo from '../../assets/img/logo.svg'
import clsx from 'clsx';




const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: `blue[500]`,
    backgroundImage: `url(${SideBarBg})`,
    backgroundSize: "inherit",    
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right" ,
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: `blue[900]`,
    backgroundImage: `url(${logo})`,
    backgroundSize: "inherit", 
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right" 
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
 
  },
  title: {
    flexGrow: 1,
    
    
  },
  title2: {
    flexGrow: 1,
    textAlign:'center',
    
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  
  SideBarWords:{
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    
    // fontSize:"12px" ,
  },
  SidebarColor:{
    backgroundColor: `blue[500]`,
    backgroundImage: `url(${SideBarBg})`,
    backgroundSize: "inherit",    
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right" ,
    // turonLogo
  },
  Space:{
    padding: theme.spacing(19) + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    backgroundColor: `blue[500]`,
    backgroundImage: `url(${SideBarBg})`,
    backgroundSize: "inherit",    
    backgroundRepeat: "repeat",
    backgroundPosition: "right" ,
    
  },
}));

const routes = [

  {
    path: '/home/registration',
    main: () => <RegistrationForm />,
  },
  {
    path: '/home/registeredtable',
    main: () => <RegisteredTable />,
  },
  {
    path:'/home/archived',
    main:()=><Archive/>
  },
  {
    path:'/home/report',
    main:()=><Report/>
  },
  {
    path: '/home/editBranch/:id',
    main: () => <EditBranch />,
  },
  {
    path:'/home/editFileType:id',
    main:()=><EditFileType/>,
  },
 
  {
    path: '/home/registerdId/:id',
    main: () => <RegisteredFormEdit />
  },
  {
    path:'/home/mibtable',
    main:()=><MibTable/>
  },
  {
    path:'/home/howHidden',
    main:()=><ShowHidden/>
  },
  {
    path:'/home/courttable',
    main:()=><CourtTable/>
  },
  {
    path:'/home/archivedId/:id',
    main:()=><ArchiveEdit/>
  },
  {
    path: '/home/usermanegmanenttable',
    main: () => <UserManagmentTable />
  },
  {
    path: '/home/addbranchandcontrol',
    main: () => <AddBranchAndManage />
  },
  {
    path:'/home/filetype',
    main:()=><FileTypesTable/>
  }
]

function HomePage(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function Logout() {
    props.history.push("/login");
  }

  const user = useSelector(state => state.authentication.user.data.user);
  {console.log(user)}
  const permission = useSelector(state => state.authentication.user.data.user.roleId);
  if (!user) {
    return <Link to="/login">Please log in</Link>;
  }

  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open, })}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, { [classes.hide]: open, })}>
            <MenuIcon />
         
          </IconButton>
    
          <Typography variant="h6" noWrap className={classes.title}>
        
            {user.lastname +' '+ user.firstname+' '+user.middlename}
        
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer  variant="permanent" className={clsx(classes.drawer, { [classes.drawerOpen]: open, [classes.drawerClose]: !open, })} classes={{ paper: clsx({ [classes.drawerOpen]: open, [classes.drawerClose]: !open, }), }}>
        <div className={classes.toolbar}>
        <Typography variant="h6" noWrap className={classes.title2}>
            {permission === 1 ? 'Юридик Департаменти' : ''}
            {permission === 2 ? 'Юрист Филиал' : ''}
            {permission === 3 ? 'Кузатувчи' : ''}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        {permission === 1 ?
          <List className={classes.SidebarColor}>
            <ListItem button onClick={() => props.history.push('/home/registration')}  >
              <ListItemIcon><AssignmentOutlinedIcon />
              </ListItemIcon>
              <ListItemText className={classes.SideBarWords} primary={'Руйхатга олиш'} />
            </ListItem>
            <ListItem button onClick={() => props.history.push('/home/registeredtable')} >
              <ListItemIcon><AssignmentTurnedInOutlinedIcon />
              </ListItemIcon>
              <ListItemText className={classes.SideBarWords}  primary={'Руйхатни куриш'} />
            </ListItem>
            <Tooltip  title={<h6>Мажбурий ижро бюроси</h6>}  arrow>
            <ListItem button onClick={() => props.history.push('/home/mibtable')}  >
              <ListItemIcon><AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText className={classes.SideBarWords}  primary={'МИБ'} />
            </ListItem>
          </Tooltip>
            <Tooltip  title={<h6>Прократура органларига берилган кредитлаш</h6>}  arrow>
            <ListItem button onClick={() => props.history.push('/home/courttable')}  >
              <ListItemIcon><AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText className={classes.SideBarWords}  primary={'Прократура '} />
            </ListItem>
            </Tooltip>
            <Tooltip  title={<h6>Фойдаланувчиларни бошкариш</h6>}  arrow>
            <ListItem button onClick={() => props.history.push('/home/usermanegmanenttable')} >
              <ListItemIcon><PeopleAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText className={classes.SideBarWords}  primary={'Фойдаланувчиларни...'} />
            </ListItem>
            </Tooltip>
            <Tooltip title={<h6>Филиал кушиш ва бошкариш</h6>} arrow>
            <ListItem button onClick={() => props.history.push('/home/addbranchandcontrol')} >
              <ListItemIcon><AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText className={classes.SideBarWords}  primary={'Филиал ...'} />
            </ListItem>
            </Tooltip>
            <ListItem button onClick={() => props.history.push('/home/report')}  >
              <ListItemIcon><ReportIcon />
              </ListItemIcon>
              <ListItemText className={classes.SideBarWords}  primary={'Хисобот'} />
            </ListItem>
            <ListItem button onClick={() => props.history.push('/home/filetype')}  >
              <ListItemIcon><FileCopyIcon />
              </ListItemIcon>
              <ListItemText className={classes.SideBarWords}  primary={'Файл турлари'} />
            </ListItem>
            <Tooltip title={<h6>Яширилган малумотлар руйхати</h6>} arrow>
       <ListItem button onClick={() => props.history.push('/home/howHidden')}  >
              <ListItemIcon><VisibilityOffIcon />
              </ListItemIcon>
              <ListItemText className={classes.SideBarWords}  primary={'Яширилган...'} />
            </ListItem>
    </Tooltip>
          
          </List>
          : ''}
        {permission === 2 ?
          <List className={classes.SidebarColor}>
            <ListItem button onClick={() => props.history.push('/home/registration')}  >
              <ListItemIcon><AssignmentOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Руйхатга олиш'} />
            </ListItem>
            <ListItem button onClick={() => props.history.push('/home/registeredtable')} >
              <ListItemIcon><AssignmentTurnedInOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Руйхатни куриш'} />
            </ListItem>
            <Tooltip  title={<h6>Мажбурий ижро бюроси</h6>}  arrow>
            <ListItem button onClick={() => props.history.push('/home/mibtable')}  >
              <ListItemIcon><AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary={'Миб'} />
            </ListItem> 
            </Tooltip>  
            <Tooltip  title={<h6>Прократура органларига берилган кредитлаш</h6>}  arrow>
            <ListItem button onClick={() => props.history.push('/home/courttable')}  >
              <ListItemIcon><AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary={'Прократура '} />
            </ListItem>
            </Tooltip>
          </List>
          : ''}
        {permission === 3 ?
          <List className={classes.SidebarColor}>
            <ListItem button onClick={() => props.history.push('/home/registeredtable')} >
              <ListItemIcon><AssignmentTurnedInOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Руйхатни куриш'} />
            </ListItem>
            <Tooltip  title={<h6>Прократура органларига берилган кредитлаш</h6>}  arrow>
            <ListItem button onClick={() => props.history.push('/home/mibtable')}  >
              <ListItemIcon><AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary={'Миб'} />
            </ListItem>
            </Tooltip>
            <Tooltip  title={<h6>Прократура органларига берилган кредитлаш</h6>}  arrow>
            <ListItem button onClick={() => props.history.push('/home/courttable')}  >
              <ListItemIcon><AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary={'Прократура'} />
            </ListItem>
            </Tooltip>
          </List>
          : ''}
        <Divider />
        <List className={classes.SidebarColor}>
          <ListItem button onClick={() => props.history.push('/home/archived')} >
            <ListItemIcon><ArchiveIcon />
            </ListItemIcon>
            <ListItemText primary={'Архив'} />
          </ListItem>
          <ListItem onClick={Logout} >
            <ListItemIcon><ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Чикиш'} style={{cursor:'pointer'}} />
          </ListItem>
        </List>
        <List className={classes.SidebarColor}>
          <ListItem className={classes.Space}>
          <ListItemText primary={''} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content} style={{ overflow: 'hidden' }}>
        <div className={classes.toolbar} />
        <Card >
          {routes.map((route, index) => (
            <PrivateRoute key={index} path={route.path} exact={route.exact} component={route.main} />
          ))}
        </Card>
      </main>
  
    </div >
  );
}

export { HomePage };
