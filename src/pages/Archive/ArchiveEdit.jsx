import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { makeStyles, Paper } from '@material-ui/core';
import {Toolbar } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import Popup from "../../components/Popup";
import { userService } from '../../services';
import CardStyle from "../../components/CardStyle";
import MainRoot from "../../components/MainRoot";
import { base_url, numberWithSpaces } from '../../utils/constants';

import { withRouter, useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PageHeader from "../../components/PageHeader";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(5),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    newButton: {
        position: 'absolute',
        right: '-20px'
    },
    loadingCircle: {
         
        alignItems:'center',
        textAlign:'center',
   },
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: '#fafafa',
            backgroundColor: '#476F56',
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
    },
    head: {
        position: "sticky",
        top: 0
    }
}));

const ArchiveEdit = (props) => {
    const [openPopup, setOpenPopup] = useState(false)
    const history = useHistory();
    const classes = useStyles();
    const branchId = useSelector(state => state.authentication.user.data.user.branchId);
    const [records, setRecords] = useState([])
    const [openPopupApplication, setOpenPopupApplication] = useState(false)
    const [initialFile, setInitialFile] = useState([])
    const [ChangebleData, setChangebleData] = useState([])
    const [editId, setEditId] = useState('')
    const [branchMfo, setBranchMfo] = useState([])
    const [loading,setLoading]=useState(false)

    const archiveId = props.match.params.id;


    const functionGetArchievedAppsById = (branchId, archiveId) => {
        setLoading(false)
        userService.getArchievedAppsById(branchId, archiveId)
            .then(res => {
                console.log(res)
                setRecords(res.data.data[0]);
                setBranchMfo(res.data.data[0].branch.MFO)
                setChangebleData(res.data.data[0].applications)
                setEditId(res.data.data.id)
                setLoading(true)
            })
            .catch(e => {
                console.log(e)
            })
    }
    
    useEffect(() => {
        functionGetArchievedAppsById(branchId, archiveId);
    }, [branchId, archiveId])

 
    return (
        <MainRoot>
            <CardStyle>

           
            <PageHeader
                title="Архивланган муаммоли кредитларни батафсил куриш сахифаси"
                subTitle=""
            />
                   {loading ?
            <TableContainer >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            <TableCell >{'Tartib raqam'}</TableCell>
                            <TableCell >{'МФО'}</TableCell>
                            <TableCell >{'Мижоз исми'}</TableCell>
                            <TableCell >{'Kредит Суммаси'}</TableCell>
                            <TableCell >{'Кредит таминоти'}</TableCell>
                            <TableCell >{'Берилган кредит санаси'}</TableCell>
                            <TableCell >{'Кредит кайтариш кредит санаси'}</TableCell>
                            <TableCell >{'Мурожат этилган суд'}</TableCell>
                            <TableCell >{' Мурожат этилган суд санаси'}</TableCell>
                            <TableCell >{'Даво ва кушимча даво жами суммаси'}</TableCell>
                            <TableCell >{'Хал килувчи карор чикарилган сана'}</TableCell>
                            <TableCell >{'Асосий карз'}</TableCell>
                            <TableCell >{'Фоиз карз'}</TableCell>
                            <TableCell >{'Пеня'}</TableCell>
                            <TableCell >{'Жами сумма'}</TableCell>
                            <TableCell >{'Ижарага берилган миб номи'}</TableCell>
                            <TableCell >{'Mиб ижросига берилган сана'}</TableCell>
                            <TableCell >{'Прократура номи'}</TableCell>
                            <TableCell >{'Прократура органларига берилган сана'}</TableCell>
                            <TableCell >{'Судда карорга асосан ундирилган сумма'}</TableCell>
                            <TableCell >{'Хисобот даврида ундирилган сумма'}</TableCell>
                            <TableCell >{'Карздорлик колдиги суммаси'}</TableCell>
                            <TableCell >{'Ишнинг кайси холатда турганлиги тугрисида малумот'}</TableCell>
                            <TableCell >{'Файл'}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      
                        {
                            ChangebleData.map((row, i) => (
                                <TableRow key={row.id} style={{ backgroundColor: (row.isPending ? 'red' : 'none') }}>
                                    <TableCell >{i + 1}</TableCell >
                                    <TableCell >{branchMfo}</TableCell >
                                    <TableCell >{records.ClientName}</TableCell >
                                    <TableCell >{numberWithSpaces(parseFloat(records.CreditAmount))}</TableCell >
                                    <TableCell >{records.CreditSupply}</TableCell >
                                    <TableCell >{records.CreditGivenDate}</TableCell >
                                    <TableCell >{records.CreditDeadline}</TableCell >
                                    <TableCell >{records.RequestedCourt}</TableCell >
                                    <TableCell >{records.RequestedCourtDate}</TableCell >
                                    <TableCell >{numberWithSpaces(parseFloat(records.RequestTotalSum))}</TableCell >
                                    <TableCell >{row.ResolvedDecisionDate}</TableCell >
                                    <TableCell >{numberWithSpaces(parseFloat(row.ResolvedMainDebtAmount))}</TableCell >
                                    <TableCell >{numberWithSpaces(parseFloat(row.ResolvedPercentageDebtAmount))}</TableCell >
                                    <TableCell >{numberWithSpaces(parseFloat(row.ResolvedFineAmount))}</TableCell >
                                    <TableCell >{numberWithSpaces(parseFloat(row.ResolvedTotalSum))}</TableCell >
                                    <TableCell >{row.MIBName}</TableCell >
                                    <TableCell >{row.MIBGivenDate}</TableCell >
                                    <TableCell >{row.CourtName}</TableCell >
                                    <TableCell >{row.CourtGivenDate}</TableCell >
                                    {row.CourtResolvedSum <=0 ? <>
                                      <TableCell >{records.CourtResolvedSum}</TableCell >
                                      <TableCell >{records.AccountedSum}</TableCell >
                                      <TableCell >{records.DebtRemainingSum}</TableCell >
                                    </>: <>  <TableCell >{numberWithSpaces(parseFloat(row.CourtResolvedSum))}</TableCell >
                                    <TableCell >{numberWithSpaces(parseFloat(row.AccountedSum))}</TableCell >
                                    <TableCell >{numberWithSpaces(parseFloat(row.DebtRemainingSum))}</TableCell ></>}
                                    <TableCell >{row.OngoingCreditStatus}</TableCell >
                                    <TableCell><Toolbar> <Controls.Button
                                        text="Файлларни куриш"
                                        variant="outlined"
                                        className={classes.newButton}
                                        onClick={() => { setOpenPopupApplication(true) }}
                                    /></Toolbar></TableCell>
                                 
                                          <Popup
                                            title="Файлларни куриш сахифаси"
                                            openPopup={openPopupApplication}
                                            setOpenPopup={setOpenPopupApplication}
                                        >
                                            <div>  {row.files.map((item) => (
                                                <div key={item.id}><a href={`${base_url}/files/${item.Name}`}><Toolbar> <Controls.Button
                                                    text={item.Name}
                                                    variant="outlined"
                                                    className={classes.newButton}
                                                    onClick={() => { setOpenPopupApplication(true); }}
                                                />        </Toolbar></a></div>

                                            ))}</div>

                                        </Popup>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
 :     <div className={classes.loadingCircle}><CircularProgress  /></div> }
        </CardStyle>
        </MainRoot>
    )
}

export default withRouter(ArchiveEdit)
