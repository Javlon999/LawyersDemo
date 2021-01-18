import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import CardStyle from "../../components/CardStyle";
import MainRoot from "../../components/MainRoot";
import { Paper, makeStyles, TableBody, TableRow,TableContainer,Table, TableCell, Toolbar, InputAdornment,  withStyles } from '@material-ui/core';
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
        right: '-20px'
    }
}))


const headCells = [
    { id: 'id', label: 'Тартиб ракам' },
    { id: 'branchId', label: 'МФО' },
    { id: 'ClientName', label: 'Мижоз исми' },
    { id: 'ResolvedDecisionDate', label: 'Хал килувчи карор чикарилган сана' },
    { id: 'MIBName', label: 'Ижрога берилган миб номи' },
    { id: 'MIBGivenDate', label: 'Mиб ижросига берилган сана' },
    { id: 'AccountedSum', label: 'Хисобот даврида ундирилган сумма' },
    { id: 'DebtRemainingSum', label: 'Карздорлик колдиги суммаси' },
    { id: 'OngoingCreditStatus', label: 'Ишнинг кайси холатда турганлиги тугрисида малумот' },

]
export default function MibTable(props) {
    const branchId = useSelector(state => state.authentication.user.data.user.branchId);
    const permission = useSelector(state => state.authentication.user.data.user.roleId);
    const classes = useStyles();
    const [records, setRecords] = useState([])
    const [constantData, setConstantData] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
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
                title=" Миб ижро хужжатлари буйича карздорликни ундириш юзасидан маьлумот"
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
                <TableContainer >
                <Table  stickyHeader aria-label="sticky table" className={classes.tableContainer}>
                    <TblHead />
                    <TableBody>
                        {recordsAfterPagingAndSorting().map((item, i) =>
                 
                            (<TableRow key={item.id}  >
                                {item.applications.length >0 && item.applications[0].MIBName? <>
                                {console.log(item)}
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{item.branch.MFO}</TableCell>
                               <TableCell>{item.ClientName}</TableCell>
                               
                              <TableCell>{item.applications[0].ResolvedDecisionDate}</TableCell>
                                      <TableCell>{item.applications[0].MIBName}</TableCell>
                                       <TableCell>{item.applications[0].MIBGivenDate}</TableCell>
                                    <TableCell>{numberWithSpaces(parseFloat(item.applications[0].AccountedSum>0 ? item.applications[0].AccountedSum:item.AccountedSum))}</TableCell>
                                   <TableCell>{numberWithSpaces(parseFloat(item.applications[0].DebtRemainingSum>0?item.applications[0].DebtRemainingSum>0:item.DebtRemainingSum ))}</TableCell>
                                   <TableCell>{item.applications[0].OngoingCreditStatus}</TableCell>
                            
                                   
                               
                                </>:''} </TableRow>)
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