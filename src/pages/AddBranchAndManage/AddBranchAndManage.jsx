import React, { useState, useEffect } from 'react'
import AddBranchForm from '../AddBranchAndManage/AddBranchForm';
import { userService } from '../../services/user.service'
import { Link } from "react-router-dom";
import CardStyle from "../../components/CardStyle";
import MainRoot from "../../components/MainRoot";
import PageHeader from "../../components/PageHeader";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '50%'
    },
    loadingCircle: {
         
        alignItems:'center',
        textAlign:'center',
   },
    newButton: {
        position: 'absolute',
        right: '100px'
    }
}))

const headCells = [

    { id: 'MFO', label: 'Филиал Ид раками' },
    { id: 'Name', label: 'Филиал номи' },
    { id: 'actions', label: 'Тахрирлаш', disableSorting: true }
]

export default function AddBranchAndManage(props) {
    const classes = useStyles();
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [loading,setLoading]=useState(false)
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
    console.log(records);

    // Table data from getting 
    function getAllBranches() {
        setLoading(false)
        userService.getBranches()
            .then(res => {
                console.log(res)
                setRecords(res.data.data)
                setLoading(true)
            })
            .catch(e => {
                console.log(e)
            })
    }
    useEffect(() => {
        getAllBranches()
    }, [])


    //

    // Searching
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.Name.includes(target.value))
            }
        })
    }
    //
    return (
        <MainRoot>
            <CardStyle>
            <PageHeader
                title="Filial Qo'shish va boshqarish "
                subTitle=""
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Филиал номи"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Филиал кушиш"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); }}
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
                                    <TableCell>{item.MFO}</TableCell>
                                    <TableCell>{item.Name}</TableCell>
                                    <div><Link to={`/home/editbranch/${item.id}`}><Toolbar> <Controls.Button
                                        text="Тахрирлаш"
                                        variant="outlined"

                                        className={classes.newButton}
                                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                    />

                                    </Toolbar></Link></div>


                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                 :     <div className={classes.loadingCircle}><CircularProgress  /></div> }
                <TblPagination />
            </Paper>
            <Popup
                title="Филиал куриш ва узгартириш"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <AddBranchForm
                />
            </Popup>
            </CardStyle>
            </MainRoot>
    )
}