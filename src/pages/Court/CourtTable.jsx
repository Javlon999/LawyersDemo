import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import CardStyle from "../../components/CardStyle";
import MainRoot from "../../components/MainRoot";
import PageHeader from "../../components/PageHeader";
import { Paper, makeStyles, TableBody, TableRow, TableCell, TableContainer,Table,Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import { userService } from '../../services/user.service'
import { base_url, numberWithSpaces } from '../../utils/constants';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '20%'
    },
    loadingCircle: {
         
        alignItems:'center',
        textAlign:'center',
   },
    newButton: {
        position: 'absolute',
       
    }
}))


const headCells = [
    { id: 'idd', label: 'Тартиб ракам' },
    { id: 'branchIdd', label: 'МФО' },
    { id: 'ClientNamee', label: 'Мижоз исми' },
    { id: 'CreditAmountt', label: 'Kредит Суммаси' },
    { id: 'CourtName', label: 'Прократура номи' },
    { id: 'CourtResolvedSumm', label: 'Судда карорга асосан ундирилган сумма' },
    { id: 'ResolvedDecisionDatee', label: 'Хал килувчи карор чикарилган сана' },
    { id: 'CourtGivenDatee', label: 'Прократура органларига берилган сана' },
    { id: 'CourtResolvedSumm', label: 'Судда карорга асосан ундирилган сумма' },
    { id: 'DebtRemainingSumm', label: 'Карздорлик колдиги суммаси' },
]

export default function CourtTable(props) {
    const branchId = useSelector(state => state.authentication.user.data.user.branchId);
    const permission = useSelector(state => state.authentication.user.data.user.roleId);
    const classes = useStyles();
    const [records, setRecords] = useState([])
    const [constantData, setConstantData] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        const functionGetInProcessApps = () => {
            setLoading(false)
            userService.getInProcessApps(branchId)
                .then(res => {
                    console.log(res);
                    setRecords(res.data.data);
                    setLoading(true)
                })
                .catch(e => {
                    console.log(e)
                })
        }
        functionGetInProcessApps()
    }, [])

    const {
        TblContainer,
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
 

    return (

        <MainRoot>
            <CardStyle>
            <PageHeader
                title="Прократура органларига берилган кредитлар тугрисида"
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
                </Toolbar>
                {loading ?
                <TableContainer>
               <Table  stickyHeader aria-label="sticky table" className={classes.tableContainer}>
                    <TblHead />
                    <TableBody>
                        {recordsAfterPagingAndSorting().map((item, i) =>
                            (<TableRow key={item.id} >
                                {item.applications.length >0 && item.applications[0].courtName ?<>
                                {console.log(item)}
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{item.branch.MFO}</TableCell>
                                <TableCell>{item.ClientName}</TableCell>
                                <TableCell>{numberWithSpaces(parseFloat(item.CreditAmount))}</TableCell>
                                <TableCell>{numberWithSpaces(parseFloat(item.applications[0].CourtName))}</TableCell>
                                 <TableCell>{numberWithSpaces(parseFloat(item.CourtResolvedSum))}</TableCell>
                                    <TableCell>{item.applications[0].ResolvedDecisionDate}</TableCell>
                                    <TableCell>{item.applications[0].CourtGivenDate}</TableCell>
                                    <TableCell>{numberWithSpaces(parseFloat(item.applications[0].AccountedSum>0 ? item.applications[0].AccountedSum:item.AccountedSum))}</TableCell>
                                   <TableCell>{numberWithSpaces(parseFloat(item.applications[0].DebtRemainingSum>0?item.applications[0].DebtRemainingSum:item.DebtRemainingSum ))}</TableCell>
                                    
                            </>:''}</TableRow>)
                        )
                        }
                    </TableBody>
                    </Table>
                </TableContainer>
                  :     <div className={classes.loadingCircle}><CircularProgress  /></div> }
                <TblPagination />
            </Paper>
            </CardStyle>
            </MainRoot>
    )
}