import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar,TableContainer, InputAdornment,withStyles } from '@material-ui/core';
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import { userService } from '../../services/user.service'
import { numberWithSpaces } from '../../utils/constants';
import CardStyle from "../../components/CardStyle";
import MainRoot from "../../components/MainRoot";
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '30%'
    },
    loadingCircle: {
         
        alignItems:'center',
        textAlign:'center',
   },
    newButton: {
        position: 'relative',
    }
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
    { id: 'actions', label: 'Тахрирланган малумотлар', disableSorting: true }
]

export default function Archive(props) {
    const branchId = useSelector(state => state.authentication.user.data.user.branchId);
    const permission = useSelector(state => state.authentication.user.data.user.roleId);
    const classes = useStyles();
    const [records, setRecords] = useState([])
    const [constantData, setConstantData] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [loading,setLoading]=useState(false)

        const functionGetArchievedApps = () => {
            setLoading(false)
            userService.getArchievedApps(branchId)
                .then(res => {
                    console.log(res);
                    setRecords(res.data.data);
                    setLoading(true)

                })
                .catch(e => {
                    console.log(e)
                })
        }
    
        useEffect(() => {
            functionGetArchievedApps()
        }, [])


    const {
        TblContainer,
        TblHead,
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
    const handleSearchByMibName = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.MIBName.includes(target.value))
            }
        })
    }

    return (

        <MainRoot>
            <CardStyle>

         
            <PageHeader
                title="Архивга олинган муаммоли кредитларни куриш сахифаси"
                subTitle=""
            />
            {/* <RegisteredFormEdit pending={pending} /> */}
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
                                            {item.applications[0].ResolvedDecisionDate}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {numberWithSpaces(parseFloat(item.applications[0].ResolvedMainDebtAmount))}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {numberWithSpaces(parseFloat(item.applications[0].ResolvedPercentageDebtAmount))}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {numberWithSpaces(parseFloat(item.applications[0].ResolvedFineAmount))}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {numberWithSpaces(parseFloat(item.applications[0].ResolvedTotalSum))}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.applications[0].MIBName}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.applications[0].MIBGivenDate}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.applications[0].CourtName}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.applications[0].CourtGivenDate}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {numberWithSpaces(parseFloat(item.applications[0].CourtResolvedSum))}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {numberWithSpaces(parseFloat(item.applications[0].AccountedSum))}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {numberWithSpaces(parseFloat(item.applications[0].DebtRemainingSum))}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            numeric
                                            align="center"
                                            className={classes.cell}
                                        >
                                            {item.applications[0].OngoingCreditStatus}
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
                                  
                                <TableCell>
                                    <div><Link to={`/home/archivedId/${item.id}`}><Toolbar> <Controls.Button
                                        text="Куриш"
                                        variant="outlined"

                                        className={classes.newButton}
                                        onClick={() => { setOpenPopup(true); }}
                                    />        </Toolbar></Link></div>
                                </TableCell>
                            
                              </StyledTableRow>
                           
                                    )
                            })}
                    </TableBody>
                </TableContainer>
                   :     <div className={classes.loadingCircle}><CircularProgress  /></div> }
                <TblPagination />
            </Paper>
            </CardStyle>
        </MainRoot>
    )
}