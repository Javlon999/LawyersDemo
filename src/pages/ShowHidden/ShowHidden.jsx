import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Search } from "@material-ui/icons";
import { Paper, Toolbar, InputAdornment,Card,s } from '@material-ui/core';

import { base_url, numberWithSpaces } from '../../utils/constants';
import { userService } from '../../services/user.service'

import PageHeader from "../../components/PageHeader";
import CardStyle from "../../components/CardStyle";
import MainRoot from "../../components/MainRoot";

import CircularProgress from '@material-ui/core/CircularProgress';
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";


import {
    makeStyles,
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Table,
    withStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3)
    },
    head: {

        backgroundColor: "#fff",
        minWidth: "50px"
    },
    tableContainer: {
        minWidth: 650,
    },
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    searchInput: {
        width: '20%'
    },
    newButton: {
        position: 'relative',
    },
    cell: {
        minWidth: "70px"
    },
    filePosition: {
        position: 'relative',
        left: '60%',
    },
     loadingCircle: {
         alignItems:'center',
         textAlign:'center',
    },
    downloadExcel: {
        backgroundColor: '#4C45B1',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
}));

const StickyTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        left: 0,
        
        position: "sticky",
        zIndex: theme.zIndex.appBar + 2
    },
    body: {
        backgroundColor: "#ddd",
        minWidth: "50px",
        left: 0,
        position: "sticky",
        zIndex: theme.zIndex.appBar + 1
    }
}))(TableCell);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow);

const headCells = [
    { id: 'CreditAmount', label: 'Kредит Суммаси' },
    { id: 'CreditSupply', label: 'Кредит таминоти' },
    { id: 'CreditGivenDate', label: 'Берилган кредит санаси' },
    { id: 'CreditDeadline', label: 'Кредит кайтариш кредит санаси' },
    { id: 'RequestedCourt', label: 'Мурожат этилган суд' },
    { id: 'RequestedCourtDate', label: 'Мурожат этилган суд санаси' },
    { id: 'RequestTotalSum', label: 'Даво ва кушимча даво жами суммаси' },
    { id: 'ResolvedDecisionDate', label: 'Хал килувчи карор чикарилган сана' },
    { id: 'ResolvedMainDebtAmount', label: 'Асосий карз' },
    { id: 'ResolvedPercentageDebtAmount', label: 'Фоиз карз' },
    { id: 'ResolvedFineAmount', label: 'Пеня' },
    { id: 'ResolvedTotalSum', label: 'Жами сумма' },
    { id: 'MIBName', label: 'Ижарага берилган миб номи' },
    { id: 'MIBGivenDate', label: 'Mиб ижросига берилган сана' },
    { id: 'CourtName', label: 'Прократура номи' },
    { id: 'CourtGivenDate', label: 'Прократура органларига берилган сана' },
    { id: 'CourtResolvedSum', label: 'Судда карорга асосан ундирилган сумма' },
    { id: 'AccountedSum', label: 'Хисобот даврида ундирилган сумма' },
    { id: 'DebtRemainingSum', label: 'Карздорлик колдиги суммаси' },
    { id: 'OngoingCreditStatus', label: 'Ишнинг кайси холатда турганлиги тугрисида малумот ' },
    { id: 'actions', label: 'Батафсил', disableSorting: true },
    { id: 'hide', label: 'Яширилган малумотларни актвлаштириш', disableSorting: true },
]
export default function RegisteredTable(props) {

    const classes = useStyles();
 

    const branchId = useSelector(state => state.authentication.user.data.user.branchId);
    const permission = useSelector(state => state.authentication.user.data.user.roleId);
    const [records, setRecords] = useState([])
    const [constantData, setConstantData] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [loading,setLoading]=useState(false)
        const functionGetInProcessApps = (branchId) => {

            setLoading(false)
            userService.showHidden(branchId)
                .then(res => {
                    console.log(res);
                    setRecords(res.data.data);
                    setLoading(true)
                }
                )
                .catch(e => {
                    console.log(e)
                })
        }
  

const hideInprocessData = (id) => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })
        userService.showHiddenById(id)
        .then(res => {
                        setNotify({
                            isOpen: true,
                            message: 'Муваффакиятли амалга оширилди ',
                            type: 'error'
                        })
                        functionGetInProcessApps(branchId);
                    })
                      
            .catch(e => {
                console.log(e)
            })
    }
    
 

        useEffect(() => {
        functionGetInProcessApps(branchId);
    }, [branchId])
    const {
        TblContainer,
        StickyTblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearchByName = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.ClientName.includes(target.value))
            }
        })
    }
    
    return (
        <MainRoot>
         <CardStyle > 
            <PageHeader
                title="Яширилган малумотларни  куриш сахифаси"
             
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
                        onChange={handleSearchByName}
                    />

                    <Toolbar className={classes.filePosition}>
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className={classes.downloadExcel}
                            table="example1"
                            filename={'files'}
                            sheet="report"
                            buttonText='Файл юкламок' />
                    </Toolbar>

                </Toolbar>
                {loading ?
                <TableContainer >
               
                    <Table id="example1" size="small" aria-label="a dense table" className={classes.tableContainer}>

                        <StickyTblHead />

                        <TableBody className="table table-bordered">
                            {recordsAfterPagingAndSorting().map((item, i) => {
                                return (
                                    <StyledTableRow key={item.id} style={{ backgroundColor: item.applications.length > 0 ? (item.applications[0].isPending ? 'red' : 'none') : null }}>
                                        <StickyTableCell>
                                            <StyledTableCell
                                                
                                                align="right"
                                                className={classes.cell}
                                            >
                                                {i + 1}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                
                                                align="right"
                                                className={classes.cell}
                                            >
                                                {item.branch.MFO}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {item.ClientName}
                                            </StyledTableCell>
                                        </StickyTableCell>
                                        <StyledTableCell
                                            
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {numberWithSpaces(parseFloat(item.CreditAmount))}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.CreditSupply}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.CreditGivenDate}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.CreditDeadline}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.RequestedCourt}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.RequestedCourtDate}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {numberWithSpaces(parseFloat(item.RequestTotalSum))}
                                        </StyledTableCell>

                                        {item.applications.length > 0 ? <>
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {item.applications[0].ResolvedDecisionDate}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications[0].ResolvedMainDebtAmount))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications[0].ResolvedPercentageDebtAmount))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications[0].ResolvedFineAmount))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications[0].ResolvedTotalSum))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {item.applications[0].MIBName}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {item.applications[0].MIBGivenDate}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {item.applications[0].CourtName}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {item.applications[0].CourtGivenDate}
                                            </StyledTableCell>
                                            {item.applications[0].CourtResolvedSum > 0 ? <>
                                                <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications[0].CourtResolvedSum))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications[0].AccountedSum))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications[0].DebtRemainingSum))}
                                            </StyledTableCell>
                                     </>:<> 
                                     <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.CourtResolvedSum))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.AccountedSum))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.DebtRemainingSum))}
                                                </StyledTableCell>
                                    </>}
                                           
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {item.applications[0].OngoingCreditStatus}
                                            </StyledTableCell>
                                        </> : <>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {item.ResolvedDecisionDate}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.ResolvedMainDebtAmount))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.ResolvedPercentageDebtAmount))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.ResolvedFineAmount))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.ResolvedTotalSum))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {item.MIBName}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {item.MIBGivenDate}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {item.CourtName}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {item.CourtGivenDate}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.CourtResolvedSum))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.AccountedSum))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.DebtRemainingSum))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {item.OngoingCreditStatus}
                                                </StyledTableCell>
                                                
                                            </>}
                                        {permission !== 3 ?
                                            <StyledTableCell
                                                
                                                align="center"
                                                className={classes.cell}
                                            > <div><Link to={`/home/registerdId/${item.id}`}><Toolbar> <Controls.Button
                                                text="Батафсил"
                                                variant="outlined"

                                                className={classes.newButton}
                                                onClick={() => { setOpenPopup(true); }}
                                            />        </Toolbar></Link></div>
                                            </StyledTableCell> : ''}
                                            { permission===1 ?
                                        <StyledTableCell   
                                        align="center"
                                        className={classes.cell}> 
                                            <Controls.ActionButton
                                                color="palette.primary.red"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Ушбу малумотни активлаштиришга ишончингиз комилми ?',
                                                        subTitle: "Ушбу оператсияни бекор кила олмайсиз",
                                                        onConfirm: () => { hideInprocessData(item.id) }
                                                    })
                                                }}>
                                                <LockOpenOutlinedIcon fontSize="small" />
                                            </Controls.ActionButton>
                                          
                                        </StyledTableCell>
                                        :''}

                                    </StyledTableRow>
                                   
                                );
                            })}
                        </TableBody>
                        
                    </Table>
                
                </TableContainer>
                :     <div className={classes.loadingCircle}><CircularProgress  /></div> }
                <TblPagination />
                <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
                        
            </Paper>
            </CardStyle>
      </MainRoot>
    );
};

