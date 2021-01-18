
import { useForm } from '../../components/useForm';
export function Validation(items) {

    const initialFValues = {
        id: 0,
        ResolvedDecisionDate:'',
        ResolvedMainDebtAmount:'',
        ResolvedPercentageDebtAmount:'',
        ResolvedFineAmount:'',
        ResolvedTotalSum:'',
        MIBName:'',
        MIBGivenDate:'',
        fileType:'',
        AccountedSum: '',
        OngoingCreditStatus: '',
        isPermanent: false,
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
      
        if ('fileType' in fieldValues)
            temp.fileType = fieldValues.fileType.length !== 0 ? "" : "Файл тури ёзилмаган" 
     
    
        if ('OngoingCreditStatus' in fieldValues)
            temp.OngoingCreditStatus = fieldValues.OngoingCreditStatus.length !== 0 ? "" : "Ишнинг кайси холатда турганлиги тугрисида ма'лумот ёзилмаган"


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
        resetForm
    } = useForm(initialFValues, true, validate);
    return {
        validate,
        handleInputChange,
        resetForm,
        values,
        setValues,
        errors

    }
}




