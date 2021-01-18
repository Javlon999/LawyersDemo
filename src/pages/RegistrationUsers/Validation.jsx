
import { useForm } from '../../components/useForm';
export function Validation() {

    const initialFValues = {
        id: 0,
        ClientName: '',
        CreditAmount: '',
        CreditSupply: '',
        departmentId: '',
        CreditGivenDate: '',
        CreditDeadline: '',
        RequestedCourt: '',
        RequestedCourtDate: '',
        RequestTotalSum: '',
        ResolvedDecisionDate: '',
        ResolvedMainDebtAmount: '',
        ResolvedPercentageDebtAmount: '',
        ResolvedFineAmount: '',
        ResolvedTotalSum: '',
        MIBName: '',
        MIBGivenDate: '',
        CourtGivenDate: '',
        CourtName: '',
        CourtResolvedSum: '',
        AccountedSum: '',
        DebtRemainingSum: '',
        OngoingCreditStatus: '',
        fileType:'',
        files: [],
        isPermanent: false,
    }


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
   
        if ('ClientName' in fieldValues)
            temp.ClientName = fieldValues.ClientName.length > 0 ? "" : "Мижоз исми ёзилмаган"
        if ('CreditAmount' in fieldValues)
            temp.CreditAmount = fieldValues.CreditAmount.length > 0 ? "" : "Кредит Суммаси ёзилмаган"
        if ('CreditSupply' in fieldValues)
            temp.CreditSupply = fieldValues.CreditSupply.length !== 0 ? "" : "Кредит та'миноти ёзилмаган"
        if ('CreditGivenDate' in fieldValues)
            temp.CreditGivenDate = fieldValues.CreditGivenDate.length !== 0 ? "" : "Берилган кредит санаси киритилмаган"
        if ('CreditDeadline' in fieldValues)
            temp.CreditDeadline = fieldValues.CreditDeadline.length !== 0 ? "" : "Кредит кайтариш кредит санаси ёзилмаган"
        if ('RequestedCourt' in fieldValues)
            temp.RequestedCourt = fieldValues.RequestedCourt.length !== 0 ? "" : "Мурожат этилган суд номи"
        if ('RequestedCourtDate' in fieldValues)
            temp.RequestedCourtDate = fieldValues.RequestedCourtDate.length !== 0 ? "" : "Мурожат этилган суд санаси киритилмаган "
        if ('RequestTotalSum' in fieldValues)
            temp.RequestTotalSum = fieldValues.RequestTotalSum.length !== 0 ? "" : "Да'во ва кушимча даво жами суммаси киритилмаган"
        if ('fileType' in fieldValues)
            temp.fileType = fieldValues.fileType.length !== 0 ? "" : "Файл тури ёзилмаган " 
        if ('OngoingCreditStatus' in fieldValues)
            temp.OngoingCreditStatus = fieldValues.OngoingCreditStatus.length !== 0 ? "" : "Ишнинг кайси холатда турганлиги тугрисида ма'лумот  киритилмаган "
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleFileChange,
        resetForm
    } = useForm(initialFValues, true, validate);
    return {
        validate,
        handleInputChange,
        handleFileChange,
        resetForm,
        values,
        setValues,
        errors

    }
}




