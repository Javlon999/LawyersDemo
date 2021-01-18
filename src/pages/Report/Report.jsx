import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import { Search } from "@material-ui/icons";
import { Grid, } from '@material-ui/core';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, TableContainer, InputAdornment,withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import PageHeader from "../../components/PageHeader";
import useTable from "../../components/useTable";
import CardStyle from "../../components/CardStyle";
import MainRoot from "../../components/MainRoot";
import Controls from "../../components/controls/Controls";
import { Form } from '../../components/useForm';
import { Validation } from './Validation';
import { userService } from '../../services/user.service'
import { base_url, numberWithSpaces } from '../../utils/constants';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '30%'
    },
    newButton: {
        position: 'absolute',
    },
    loadingCircle: {
        alignItems:'center',
        textAlign:'center',
   },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))
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


]

export default function Report(props) {
    const branchId = useSelector(state => state.authentication.user.data.user.branchId);
  
    const classes = useStyles();
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [downloadConvert, setDownloadConvert] = useState([])
    const [showConvertedData, setShowConvertedData] = useState(false)
    const [loading,setLoading]=useState(true)


    const downloadTableData = () => {
        userService.downloadTable()
            .then(res => {
                console.log(res);
                setDownloadConvert(res.data.fileLink)
                setShowConvertedData(true)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const {
        TblContainer,
        StickyTblHead,
        TblHead,
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

    const { handleInputChange,  values,  errors } = Validation();
    const handleSubmit = e => {
        e.preventDefault()
        setLoading(false)
        userService.getReport(branchId, values.StartDate, values.EndDate)
  
            .then(
                res => {
                    
                    console.log(res)
                    const report = res.data.report;
                    setRecords(report);
                    setLoading(true)
                },
                error => {
                    console.log(error)
                })

    }

    return (
        <MainRoot >
            <CardStyle>
                <PageHeader
                    title="Руйхатга олинган муаммоли кредитларни куриш сахифаси"
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
                            onChange={handleSearchByName}
                        />
                        
                        <Toolbar>
                            <Form onSubmit={handleSubmit}>
                                <div className={classes.root}>
                                    <Grid container spacing={12}>
                                        <Grid item xs={5}>
                                            <Paper className={classes.paper}>

                                                <Controls.DatePicker
                                                    label="Бошланиш санаси"
                                                    name="StartDate"
                                                    type='date'
                                                    value={values.StartDate}
                                                    onChange={handleInputChange}
                                                    error={errors.StartDate}
                                                />
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Paper className={classes.paper}>

                                                <Controls.DatePicker
                                                    label="Тугаш санаси"
                                                    name="EndDate"
                                                    type='date'
                                                    value={values.EndDate}
                                                    onChange={handleInputChange}
                                                    error={errors.EndDate}
                                                />
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Controls.Button
                                                type="submit"
                                                text="Жунатиш" />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Form>
                        </Toolbar>
                         </Toolbar>
                
                         {loading ?
                    <TableContainer>
                        <StickyTblHead />
                       
                        <TableBody className="table table-bordered">
                     
                            {recordsAfterPagingAndSorting().map((item, i) =>{
                                  return (
                                    <StyledTableRow key={item.id} style={{ backgroundColor: item.applications.length > 0 ? (item.applications[0].isPending ? 'red' : 'none') : null }}>
                                        <StickyTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="right"
                                                className={classes.cell}
                                            >
                                                {i + 1}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="right"
                                                className={classes.cell}
                                            >
                                                {item.branch.MFO}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {item.ClientName}
                                            </StyledTableCell>
                                        </StickyTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {numberWithSpaces(parseFloat(item.CreditAmount))}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.CreditSupply}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.CreditGivenDate}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.CreditDeadline}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.RequestedCourt}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.RequestedCourtDate}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {numberWithSpaces(parseFloat(item.RequestTotalSum))}
                                        </StyledTableCell>

                                        {item.applications.length > 0 ? <>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                          
                                                {item.applications.slice(Math.max(item.applications.length-1,0))[0].ResolvedDecisionDate}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications.slice(Math.max(item.applications.length-1,0))[0].ResolvedMainDebtAmount))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications.slice(Math.max(item.applications.length-1,0))[0].ResolvedPercentageDebtAmount))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications.slice(Math.max(item.applications.length-1,0))[0].ResolvedFineAmount))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications.slice(Math.max(item.applications.length-1,0))[0].ResolvedTotalSum))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {item.applications.slice(Math.max(item.applications.length-1,0))[0].MIBName}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {item.applications.slice(Math.max(item.applications.length-1,0))[0].MIBGivenDate}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {item.applications.slice(Math.max(item.applications.length-1,0))[0].CourtName}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {item.applications.slice(Math.max(item.applications.length-1,0))[0].CourtGivenDate}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications.slice(Math.max(item.applications.length-1,0))[0].CourtResolvedSum))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications.slice(Math.max(item.applications.length-1,0))[0].AccountedSum))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {numberWithSpaces(parseFloat(item.applications.slice(Math.max(item.applications.length-1,0))[0].DebtRemainingSum))}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                numeric
                                                align="center"
                                                className={classes.cell}
                                            >
                                                {item.applications.slice(Math.max(item.applications.length-1,0))[0].OngoingCreditStatus}
                                            </StyledTableCell>
                                        </> : <>
                                                <StyledTableCell
                                                    numeric
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {item.ResolvedDecisionDate}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    numeric
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.ResolvedMainDebtAmount))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    numeric
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.ResolvedPercentageDebtAmount))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    numeric
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.ResolvedFineAmount))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    numeric
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.ResolvedTotalSum))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    numeric
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {item.MIBName}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    numeric
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {item.MIBGivenDate}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    numeric
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {item.CourtName}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    numeric
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {item.CourtGivenDate}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    numeric
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.CourtResolvedSum))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    numeric
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.AccountedSum))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    numeric
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {numberWithSpaces(parseFloat(item.DebtRemainingSum))}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    numeric
                                                    align="center"
                                                    className={classes.cell}
                                                >
                                                    {item.OngoingCreditStatus}
                                                </StyledTableCell>
                                            </>}
                                            </StyledTableRow>
                                );
                            })}
                          
                        </TableBody>
                         
                    </TableContainer>
                    :     <div className={classes.loadingCircle}><CircularProgress  /></div> }
                    {showConvertedData ? <div><a href={`${base_url}/files/report/${downloadConvert}`}><Toolbar> <Controls.Button
                        text="Файл юкламок"
                        variant="outlined"
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); }}
                    />        </Toolbar></a></div> : <div><Toolbar><Controls.Button
                        text="Файл ни тахрирлаш"
                        variant="outlined"
                        className={classes.newButton}
                        onClick={() => { downloadTableData(); }}
                    />        </Toolbar></div>}
                    <TblPagination />
                </Paper>
            </CardStyle>
        </MainRoot>
    )
}