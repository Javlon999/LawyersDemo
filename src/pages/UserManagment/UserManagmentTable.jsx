import React, { useState, useEffect } from 'react'

import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import CircularProgress from '@material-ui/core/CircularProgress';

import AddNewUser from '../AddNewUser/AddNewUser';
import PageHeader from "../../components/PageHeader";
import useTable from "../../components/useTable";
import CardStyle from "../../components/CardStyle";
import MainRoot from "../../components/MainRoot";
import Controls from "../../components/controls/Controls";
import Popup from "../../components/Popup";

import EditAllUserForm from './EditAllUserForm';
import { userService } from '../../services';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '25%'
    },
    loadingCircle: {
        alignItems:'center',
        textAlign:'center',
   },
    newButtonEdit: {
        position: 'relative', 
    }
}))

const headCells = [
    { id: 'lastname', label: 'Фамилия' },
    { id: 'firstname', label: 'Исм ' },
    { id: 'middlename', label: 'Шариф' },
    { id: 'userlogin', label: 'Логин',disableSorting: true },
    { id: 'username', label: 'Филиал' },
    { id: 'roleName', label: 'Роль',disableSorting: true  },
    { id: 'actions', label: 'Тахрирлаш', disableSorting: true },
]

export default function UserManagmentTable(props) {

    const classes = useStyles();
    const [openPopup2, setOpenPopup2] = useState({open: false, item: {}})
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [loading,setLoading]=useState(false)
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
    console.log(records);
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.firstname.includes(target.value))
            }
        })
    }
    const openInPopup = item => {
        setOpenPopup(true)
    }
    function userslist() {
        setLoading(false)
        userService.usersAll()
            .then(res => {
                console.log(res);
                setRecords(res.data.users);
                setLoading(true)
            })
            .catch(e => {
                console.log(e)
            })
    }
    useEffect(() => {
        userslist();
    }, [])

    return (
        <MainRoot>
            <CardStyle>
            <PageHeader
                title="Фойдаланувчиларни бошкариш булими "
                subTitle=""
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Мижоз исми"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Фойдаланувчи кушиш"
                        variant="outlined"

                        className={classes.AddUsersButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                {loading ?
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    {console.log(item)}
                                    <TableCell>{item.lastname}</TableCell>
                                    <TableCell>{item.firstname}</TableCell>
                                    <TableCell>{item.middlename}</TableCell>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell>{item.branch.Name}</TableCell>
                                    <TableCell>{item.role.Name}</TableCell>
                                    <TableCell> 
                                    <Controls.Button
                                        text={'Тахрирлаш'}
                                        variant="outlined"
                                        startIcon={''}
                                        className={classes.newButton}
                                        onClick={() => { setOpenPopup2({open: true, item: item}); }}  
                                         />  
                                   </TableCell>
                                </TableRow>)
                            )
                        }
                                <Popup
                                      title='Тахрирлаш малумотларни'
                                      openPopup={openPopup2.open}
                                     setOpenPopup={setOpenPopup2}
                                       >
                                   <EditAllUserForm item={openPopup2.item} />
                                   
                                </Popup>
                    </TableBody>
                </TblContainer>
                        :     <div className={classes.loadingCircle}><CircularProgress  /></div> }
                <TblPagination />
            </Paper>
            <Popup
                title="Ro’yxatga olingan muommoli kreditlarni ko’rish sahifasi"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <AddNewUser />
            </Popup>
            
            </CardStyle>
        </MainRoot>
    )
}
