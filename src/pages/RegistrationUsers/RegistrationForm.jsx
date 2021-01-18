import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { makeStyles, Paper ,Card} from '@material-ui/core';
import PageHeader from "../../components/PageHeader";
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { Form } from '../../components/useForm';
import { Validation } from './Validation';
import { userService } from '../../services';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
        backgroundColor: '#F4F5F7',
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    cardDemo:{
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        borderRadius: '15px',
        padding: theme.spacing(2),
        margin:theme.spacing(2),
    },
    List:{
        padding: theme.spacing(1),
    },
}));

export default function RegistrationForm(props) {
    const history = useHistory();
    const branchId = useSelector(state => state.authentication.user.data.user.branchId);
    const [getFile,setGetFile]=useState([])
    const classes = useStyles();
    const { validate, handleInputChange, values,  errors } = Validation();
    const [files,setFile]=useState(null);
    function GetFileTypes()

    {
        userService.getFormFileTypes()
        .then(res=>{
            console.log(res)
            setGetFile(res.data.data)
        },error=>{
            console.log(error)
        }
          )
    }
    useEffect(() => {
        GetFileTypes()
      
      }, [])
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            let data = {
                ClientName: values.ClientName,
                CreditAmount:parseFloat(values.CreditAmount),
                CreditSupply:values.CreditSupply,
                CreditGivenDate:values.CreditGivenDate,
                CreditDeadline: values.CreditDeadline,
                RequestedCourt: values.RequestedCourt,
                RequestedCourtDate:values.RequestedCourtDate,
                RequestTotalSum:parseFloat(values.RequestTotalSum),
                ResolvedDecisionDate:values.ResolvedDecisionDate,
                ResolvedMainDebtAmount:parseFloat(values.ResolvedMainDebtAmount),
                ResolvedPercentageDebtAmount:parseFloat(values.ResolvedPercentageDebtAmount),
                ResolvedFineAmount:parseFloat(values.ResolvedFineAmount),
                ResolvedTotalSum:parseFloat(values.ResolvedTotalSum),
                MIBName:values.MIBName,
                MIBGivenDate:values.MIBGivenDate,
                CourtName:values.CourtName,
                CourtGivenDate:values.CourtGivenDate,
                CourtResolvedSum:parseFloat(values.CourtResolvedSum),
                AccountedSum:parseFloat(values.AccountedSum),
                DebtRemainingSum:parseFloat(values.DebtRemainingSum),
                OngoingCreditStatus: values.OngoingCreditStatus,
                filetypeId:parseInt(values.fileType),
                branchId: branchId,

            };
            const formData = new FormData();
            console.log(data);
            formData.append('data', JSON.stringify(data));
            for(let i =0; i < files.length; i++){
                formData.append("files", files[i]);
                }

            userService.createCreditApp(formData)
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
        <div className={classes.root}>
        <Form onSubmit={handleSubmit}>
            <Card className={classes.cardDemo}> 
            <PageHeader
                title="Руйхатга олиш"
            />
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Controls.Input
                                label="Мижоз исми"
                                name="ClientName"
                                value={values.ClientName}
                                onChange={handleInputChange}
                                error={errors.ClientName}
                            />
                            <NumberFormat
                                label="Kредит Суммаси "
                                name="CreditAmount"
                                customInput={Controls.Input}
                                value={values.CreditAmount}
                                thousandSeparator={' '}
                                onChange={handleInputChange}
                                error={errors.CreditAmount}
                            />
                            <Controls.Input
                                label="Кредит та'миноти"
                                name="CreditSupply"
                                value={values.CreditSupply}
                                onChange={handleInputChange}
                                error={errors.CreditSupply}
                            />
                            <Controls.DatePicker
                                label="Берилган кредит санаси"
                                name="CreditGivenDate"
                                type='date'
                                value={values.CreditGivenDate}
                                onChange={handleInputChange}
                                error={errors.CreditGivenDate}
                            />
                            <Controls.DatePicker
                                label="Кредит кайтариш кредит санаси"
                                name="CreditDeadline"
                                type='date'
                                value={values.CreditDeadline}
                                onChange={handleInputChange}
                                error={errors.CreditDeadline}
                            />
                            <Controls.Input
                                label="Мурожат этилган суд"
                                name="RequestedCourt"
                                value={values.RequestedCourt}
                                onChange={handleInputChange}
                                error={errors.RequestedCourt}
                            />
                        </Paper>
                    </Grid>
                  
                     <Grid item xs={6}>
                        <Paper className={classes.paper}> 
                          <Controls.DatePicker
                                label="Мурожат этилган суд санаси"
                                name="RequestedCourtDate"
                                type='date'
                                value={values.RequestedCourtDate}
                                onChange={handleInputChange}
                                error={errors.RequestedCourtDate}
                            />
                            <NumberFormat
                                label="Да'во ва кушимча даво жами суммаси"
                                name="RequestTotalSum"
                                customInput={Controls.Input}
                                value={values.RequestTotalSum}
                                thousandSeparator={' '}
                                onChange={handleInputChange}
                                error={errors.RequestTotalSum}
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
                             <Controls.Input
                               
                                name="fileType"
                                type="file"
                                multiple={true}
                                onChange={(e) => setFile(e.target.files)}
                            />
              
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}> <Controls.Button
                            type="submit"
                            text="Жунатиш" /></Paper>
                    </Grid>

                </Grid>
                </Card>
       
        </Form >
        </div>
    )
}