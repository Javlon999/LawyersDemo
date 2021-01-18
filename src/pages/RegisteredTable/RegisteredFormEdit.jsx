import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userService } from '../../services';
import NumberFormat from 'react-number-format';
import { Grid, Toolbar } from '@material-ui/core';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,withStyles,CircularProgress} from '@material-ui/core';

import baseUrl, { replaceAll } from '../../utils/baseUrl'
import { base_url, numberWithSpaces } from '../../utils/constants';
import { Validation } from './Validation';

import CardStyle from "../../components/CardStyle";
import MainRoot from "../../components/MainRoot";
import Popup from "../../components/Popup";
import СhangeComment from './ChangeComment';
import { makeStyles, Paper ,List } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { Form } from '../../components/useForm';
import PageHeader from "../../components/PageHeader";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

import CloseIcon from '@material-ui/icons/Close';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

const useStyles = makeStyles((theme) => ({
    
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    
    List:{
        padding: theme.spacing(1),
    },
    newButton: {
        position: 'relative',
        fontSize: '14px',
    },
    Button:{
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    fileUpload:{
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        borderRadius: '1px',
        border: '1px solid black',
        padding: theme.spacing(1),
        margin:theme.spacing(2),
    },
    loadingCircle: {
        alignItems:'center',
        textAlign:'center',
   },
    formCenter: {
        padding: theme.spacing(1),
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

const RegisteredFormEdit = (props) => {

    const permission = useSelector(state => state.authentication.user.data.user.roleId);
    const history = useHistory();
    const classes = useStyles();
    const branchId = useSelector(state => state.authentication.user.data.user.branchId);

    const [openPopup, setOpenPopup] = useState(false)
    const [openPopup2, setOpenPopup2] = useState({open:false,items:{}})
    const [openPopupApplication, setOpenPopupApplication] = useState(false)

    const [records, setRecords] = useState([])
    const [files, setFile] = useState(null);
    const [ChangebleData, setChangebleData] = useState([])
    const [editId, setEditId] = useState('')
    const [branchMfo, setBranchMfo] = useState('')
    const [lastValueOfArray, setLastValueOfArray] = useState([])
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [validSum, setValidSum] = useState('')
    const [initialFile, setInitialFile] = useState([])
    const [initialFileType, setInitialFileType] = useState([])
    const { validate, handleInputChange, values, errors } = Validation();
    const inprosessId = props.match.params.id;
    const [getFile, setGetFile] = useState([])
    const [loading,setLoading]=useState(false)
     
    function GetFileTypes() {
        userService.getFormFileTypes()
            .then(res => {
                console.log(res)
                setGetFile(res.data.data)
            }, error => {
                console.log(error)
            }
            )
    }
 
    const functionGetInProcessApps = (branchId, inprosessId) => {
        setLoading(false)
        userService.getInProcessAppsDetailed(branchId, inprosessId)
            .then(res => {
                const datas = res.data.data;
                console.log(datas)
                setEditId(datas.id)
                setRecords(datas);
                setInitialFile(datas.files)
                setInitialFileType(datas.files[0].filetype.Name)
                setValidSum(res.data.ValidSum)
                setBranchMfo(datas.branch)
                setChangebleData(datas.applications)
                setLastValueOfArray(datas.applications.slice(Math.max(datas.applications.length - 1, 0))[0])
                setLoading(true)
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        GetFileTypes()
        functionGetInProcessApps(branchId, inprosessId);
    }, [branchId, inprosessId])

    
    const changePendingStatusFunction = pendId => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        userService.changePendingStatus(pendId)
            .then(res => {

                setNotify({
                    isOpen: true,
                    message: 'Муваффакиятли Активлаштирилди ',
                    type: 'error'
                })
                functionGetInProcessApps(branchId, inprosessId);

            })
            .catch(e => {
                console.log(e)
            })
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        userService.DeleteEditApp(id)
            .then(res => {
                setNotify({
                    isOpen: true,
                    message: 'Муваффакиятли Учирилди',
                    type: 'error'
                })
                functionGetInProcessApps(branchId, inprosessId);
            }).catch(e => {
                console.log(e)
            })
    }
    
    const MaximumNValidate = () => {
        let LimitMaxSum = parseFloat(validSum);
        var errorr = document.getElementById("errorr")
        if (parseFloat(values.AccountedSum.replaceAll(` `, '')) > LimitMaxSum) {

            // Changing HTML to draw attention 
            errorr.innerHTML = "<span style='color: red; text-align:'center'>" +
                "Хисобот даврида ундирилиши мумкин булган енг катта cумма микдори " + ` ${numberWithSpaces(parseFloat(LimitMaxSum))}` + "</span>"
        } else {
            errorr.innerHTML = ""

        }

    };
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            let data = {
                ResolvedDecisionDate: values.ResolvedDecisionDate,
                ResolvedMainDebtAmount: parseFloat(values.ResolvedMainDebtAmount),
                ResolvedPercentageDebtAmount: parseFloat(values.ResolvedPercentageDebtAmount),
                ResolvedFineAmount:parseFloat(values.ResolvedFineAmount),
                ResolvedTotalSum: parseFloat(values.ResolvedTotalSum),
                MIBName: values.MIBName,
                MIBGivenDate:values.MIBGivenDate,
                CourtName: values.CourtName,
                CourtGivenDate: values.CourtGivenDate,
                AccountedSum:  parseFloat(values.AccountedSum),
                OngoingCreditStatus: values.OngoingCreditStatus,
                filetypeId: parseInt(values.fileType),
            };
            { console.log(data) }
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }

            userService.editProblemCredit(editId, formData)
                .then(
                    res => {
                        console.log(res)
                        history.push('/home/registeredtable')
                    },
                    error => {
                        console.log(error)
                    })
        }
    }

    return (
        <MainRoot>
            <CardStyle> 
              <PageHeader
                title="Руйхатга олинган муаммоли кредитларни куриш ва кушимча малумотлар кушиш"
                subTitle=""
            />
             
            <List className={classes.List}>
            {loading ?
            <TableContainer component={Paper} >
               
                <Table className={classes.table} aria-label="simple table">
                    <TableHead >
                        <StyledTableRow>
                        <StickyTableCell className={classes.head}>
                <StyledTableCell className={classes.head} numeric>
                {'Тартиб ракам'}
                </StyledTableCell>
                <StyledTableCell className={classes.head} numeric>
                {'МФО'}
                </StyledTableCell>
                <StyledTableCell className={classes.head} numeric>
                {'Мижоз исми'}
                </StyledTableCell>
              </StickyTableCell>
              <StyledTableCell className={classes.head} numeric>{'Kредит Суммаси'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Кредит таминоти'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Берилган кредит санаси'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Кредит кайтариш кредит санаси'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Мурожат этилган суд'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Мурожат этилган суд санаси'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Даво ва кушимча даво жами суммаси'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Хал килувчи карор чикарилган сана'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Асосий карз'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Фоиз карз'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Пеня'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Жами сумма'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Ижарага берилган миб номи'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Mиб ижросига берилган сана'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Прократура номи'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Прократура органларига берилган сана'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Судда карорга асосан ундирилган сумма'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Хисобот даврида ундирилган сумма'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Карздорлик колдиги суммаси'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Ишнинг кайси холатда турганлиги тугрисида малумот'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Файл тури'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Файллар туплами'}</StyledTableCell>
                            {permission===1 ?<>
                            <StyledTableCell className={classes.head} numeric>{'Учириш'}</StyledTableCell>
                            <StyledTableCell className={classes.head} numeric>{'Актив'}</StyledTableCell></>:''}
                        </StyledTableRow>
                    </TableHead>
                 
                    <TableBody className="table table-bordered">
                      
                        {
                            ChangebleData.map((row, i) => (
                                <StyledTableRow key={row.id} style={{ backgroundColor: (row.isPending && row.isLast ? 'red' : 'none') }}>
                                       <StickyTableCell>
                                    <StyledTableCell className={classes.head} numeric>{i + 1}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{branchMfo.MFO}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{records.ClientName}</StyledTableCell >
                                    </StickyTableCell>
                                    <StyledTableCell className={classes.head} numeric>{numberWithSpaces(parseFloat(records.CreditAmount))}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{records.CreditSupply}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{records.CreditGivenDate}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{records.CreditDeadline}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{records.RequestedCourt}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{records.RequestedCourtDate}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{numberWithSpaces(parseFloat(records.RequestTotalSum))}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{row.ResolvedDecisionDate}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{numberWithSpaces(parseFloat(row.ResolvedMainDebtAmount))}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{numberWithSpaces(parseFloat(row.ResolvedPercentageDebtAmount))}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{numberWithSpaces(parseFloat(row.ResolvedFineAmount))}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{numberWithSpaces(parseFloat(row.ResolvedTotalSum))}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{row.MIBName}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{row.MIBGivenDate}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{row.CourtName}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{row.CourtGivenDate}</StyledTableCell >
                                    {row.CourtResolvedSum <=0 ? <>
                                    <StyledTableCell className={classes.head} numeric>{numberWithSpaces(parseFloat(records.CourtResolvedSum))}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{numberWithSpaces(parseFloat(records.AccountedSum))}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{numberWithSpaces(parseFloat(records.DebtRemainingSum))}</StyledTableCell >
                                     </>:<> 
                                    <StyledTableCell className={classes.head} numeric>{numberWithSpaces(parseFloat(row.CourtResolvedSum))}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{numberWithSpaces(parseFloat(row.AccountedSum))}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric>{numberWithSpaces(parseFloat(row.DebtRemainingSum))}</StyledTableCell >
                                    </>}
                                  
                                    <StyledTableCell className={classes.head} numeric>
                                        <Controls.Button
                                        text={row.OngoingCreditStatus}
                                         variant="outlined"
                                         startIcon={''}
                                         className={classes.newButton}
                                        onClick={() => { setOpenPopup2({open:true, items:row}); }}  
                                          />  
                                      </StyledTableCell>
                                    <StyledTableCell className={classes.head} numeric>{row.files.map((item) => (<div key={item.id}>{item.filetype.Name}</div>))}</StyledTableCell >
                                    <StyledTableCell className={classes.head} numeric><Controls.Button
                                        text="Файлларни куриш"
                                        variant="outlined"
                                        className={classes.newButton}
                                        onClick={() => { setOpenPopupApplication(true) }}
                                    /></StyledTableCell>
                                             { permission===1 ?<>
                                        <StyledTableCell className={classes.head} numeric>
                                            <Controls.ActionButton
                                                color="palette.primary.light"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Ушбу малумотни учиришга ишончингиз комилми ?',
                                                        subTitle: "Ушбу оператсияни бекор кила олмайсиз",
                                                        onConfirm: () => { onDelete(row.id) }
                                                    })
                                                }}>
                                                <CloseIcon fontSize="small" />
                                            </Controls.ActionButton>
                                        </StyledTableCell>

                               
                                        <StyledTableCell className={classes.head} numeric>{row.isPending && row.isLast ?   <Controls.ActionButton
                                            color="palette.primary.red"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Ушбу малумотни активлаштиришга ишончингиз комилми ?',
                                                    subTitle: "Ушбу оператсияни бекор кила олмайсиз",
                                                    onConfirm: () => { changePendingStatusFunction(row.id) }
                                                })
                                            }}>
                                            <LockOpenOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                            : ''}
                                        </StyledTableCell>
</>:''}
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

                                </StyledTableRow>
                            ))}
                    </TableBody>
                
                </Table>
                { permission===1 ?
                <Popup
                                      title='Ишнинг кайси холатда турганлиги тугрисида малумот '
                                      openPopup={openPopup2.open}
                                     setOpenPopup={setOpenPopup2}
                                       >
                                   <СhangeComment items={openPopup2.items}  />
                                     </Popup>:""}
            </TableContainer>
            :     <div className={classes.loadingCircle}><CircularProgress  /></div> }
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
               </List>
             </CardStyle>
             { permission !==3 ?
         <CardStyle>
             <PageHeader
                title="Руйхатга олинган муаммоли кредитларга малумотлар кушиш"
                subTitle=""
            />
        
            <List>
                <Form onSubmit={handleSubmit}>
                    <div className={classes.formCenter}>
                        <Grid container
                            spacing={0}
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: "10vh" }}>
   
                            {lastValueOfArray ? <Grid item xs={6}>

                                <Controls.DatePicker
                                    helperText="Хал килувчи карор чикарилган сана"
                                    name="ResolvedDecisionDate"
                                    type='date'
                                    value={lastValueOfArray.ResolvedDecisionDate}
                                    onChange={handleInputChange}
                                    // error={errors.ResolvedDecisionDate}
                                    disabled
                                />
                                <NumberFormat
                                    id="outlined-helperText"
                                    helperText="Асосий карз"
                                    name="ResolvedMainDebtAmount"
                                    customInput={Controls.Input}
                                    thousandSeparator={' '}
                                    value={lastValueOfArray.ResolvedMainDebtAmount}
                                    onChange={handleInputChange}
                                    // error={errors.ResolvedMainDebtAmount}
                                    disabled
                                />
                                <NumberFormat
                                    id="outlined-helperText"
                                    helperText="Фоиз карз"
                                    name="ResolvedPercentageDebtAmount"
                                    customInput={Controls.Input}
                                    thousandSeparator={' '}
                                    value={lastValueOfArray.ResolvedPercentageDebtAmount}
                                    onChange={handleInputChange}
                                    // error={errors.ResolvedPercentageDebtAmount}
                                    disabled
                                />
                                <NumberFormat
                                    id="outlined-helperText"
                                    helperText="Пеня"
                                    name="ResolvedFineAmount"
                                    customInput={Controls.Input}
                                    thousandSeparator={' '}
                                    value={lastValueOfArray.ResolvedFineAmount}
                                    onChange={handleInputChange}
                                    // error={errors.ResolvedFineAmount}
                                    disabled
                                />
                                <NumberFormat
                                    id="outlined-helperText"
                                    helperText="Жами сумма"
                                    name="ResolvedTotalSum"
                                    customInput={Controls.Input}
                                    value={lastValueOfArray.ResolvedTotalSum}
                                    thousandSeparator={' '}
                                    onChange={handleInputChange}
                                    // error={errors.ResolvedTotalSum}
                                    disabled

                                />
                                <Controls.Input
                                    id="outlined-helperText"
                                    helperText="Ижарага берилган миб номи"
                                    name="MIBName"
                                    value={lastValueOfArray.MIBName}
                                    onChange={handleInputChange}
                                    // error={errors.MIBName}
                                    disabled
                                />
                                <Controls.DatePicker
                                    id="outlined-helperText"
                                    helperText="Mиб ижросига берилган сана"
                                    name="MIBGivenDate"
                                    type='date'
                                    value={lastValueOfArray.MIBGivenDate}
                                    onChange={handleInputChange}
                                    // error={errors.MIBGivenDate}
                                    disabled
                                />

                            </Grid> :
                                <Grid item xs={6}>

                                    <Controls.DatePicker

                                        label="Хал килувчи карор чикарилган сана"
                                        name="ResolvedDecisionDate"
                                        type='date'
                                        value={values.ResolvedDecisionDate}
                                        onChange={handleInputChange}
                                        error={errors.ResolvedDecisionDate}
                                    />
                                    <NumberFormat

                                        label="Асосий карз"
                                        name="ResolvedMainDebtAmount"
                                        customInput={Controls.Input}
                                        thousandSeparator={' '}
                                        value={values.ResolvedMainDebtAmount}
                                        onChange={handleInputChange}
                                        error={errors.ResolvedMainDebtAmount}
                                    />
                                    <NumberFormat

                                        label="Фоиз карз"
                                        name="ResolvedPercentageDebtAmount"
                                        customInput={Controls.Input}
                                        thousandSeparator={' '}
                                        value={values.ResolvedPercentageDebtAmount}
                                        onChange={handleInputChange}
                                        error={errors.ResolvedPercentageDebtAmount}
                                    />
                                    <NumberFormat

                                        label="Пеня"
                                        name="ResolvedFineAmount"
                                        customInput={Controls.Input}
                                        thousandSeparator={' '}
                                        value={values.ResolvedFineAmount}
                                        onChange={handleInputChange}
                                        error={errors.ResolvedFineAmount}
                                    />
                                    <NumberFormat

                                        label="Жами сумма"
                                        name="ResolvedTotalSum"
                                        customInput={Controls.Input}
                                        value={values.ResolvedTotalSum}
                                        thousandSeparator={' '}
                                        onChange={handleInputChange}
                                        error={errors.ResolvedTotalSum}

                                    />
                                    <Controls.Input
                                        label="Ижарага берилган миб номи"
                                        name="MIBName"
                                        value={values.MIBName}
                                        onChange={handleInputChange}
                                        error={errors.MIBName}
                                    />
                                    <Controls.DatePicker
                                        label="Mиб ижросига берилган сана"
                                        name="MIBGivenDate"
                                        type='date'
                                        value={values.MIBGivenDate}
                                        onChange={handleInputChange}
                                        error={errors.MIBGivenDate}
                                    />
                                </Grid>
                            }

                            <Grid item xs={6}>
                                {ChangebleData.length > 0 ?
                                    <div>
                                        <NumberFormat
                                            label="Хисобот даврида ундирилган сумма "
                                            name="AccountedSum"
                                            customInput={Controls.Input}
                                            value={values.AccountedSum}
                                            thousandSeparator={' '}
                                            onBlur={MaximumNValidate}
                                            onChange={handleInputChange}
                                        // error={errors.AccountedSum}
                                        />
                                        <br /><span id="errorr"></span>
                                    </div> : ''}
                                <Controls.Input
                                    label="Прократура номи"
                                    name="CourtName"
                                    value={values.CourtName}
                                    onChange={handleInputChange}
                                    error={errors.CourtName}
                                />
                                <Controls.DatePicker
                                    label="Прократура органларига берилган сана"
                                    type='date'
                                    name="CourtGivenDate"
                                    value={values.CourtGivenDate}
                                    onChange={handleInputChange}
                                    error={errors.CourtGivenDate}
                                />
                                <Controls.Input
                                    label="Ишнинг кайси холатда турганлиги тугрисида ма'лумот "
                                    name="OngoingCreditStatus"
                                    value={values.OngoingCreditStatus}
                                    onChange={handleInputChange}
                                    error={errors.OngoingCreditStatus}
                                />
                                <Controls.Select
                                    label="Файл тури"
                                    name="fileType"
                                    value={values.fileType}
                                    onChange={handleInputChange}
                                    options={getFile}
                                    error={errors.fileType}
                                />
                                <input
                                    customInput={Controls.Input}
                                    className={classes.fileUpload}
                                    type="file"
                                    id="name"
                                    name="name"
                                    multiple={true}
                                    onChange={(e) => setFile(e.target.files)}
                                />
                                <div className={classes.Button}>
                                {lastValueOfArray ? (lastValueOfArray.isPending > 0 ? '' :
                                     <Controls.Button  
                                        type="submit"
                                        text="Жунатиш" />
                                ) :  <Controls.Button 
                                    type="submit"
                                    text="Жунатиш" />}
                                    </div>
                            </Grid>

                        </Grid>
                    </div>
                </Form >
                </List>
          

            </CardStyle> :''}
            <Popup
                title="Файлларни куриш сахифаси"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <div>  {initialFile.map((item) => (
                    <div key={item.id}><a href={`${base_url}/files/${item.Name}`}><Toolbar> <Controls.Button
                        text={item.Name}
                        variant="outlined"
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); }}
                    />        </Toolbar></a></div>

                ))}</div>
            </Popup>

        </MainRoot>
    )
}

export default withRouter(RegisteredFormEdit)
