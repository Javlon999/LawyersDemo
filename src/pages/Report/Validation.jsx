
import { useForm } from '../../components/useForm';
export function Validation() {

    const initialFValues = {
        id: 0,
        StartDate: '',
        EndDate:'',
        isPermanent: false,
    }


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
   
        if ('StartDate' in fieldValues)
            temp.StartDate = fieldValues.StartDate.length !== 0 ? "" : "бошланиш санаси киритилмаган"
        if ('EndDate' in fieldValues)
            temp.EndDate = fieldValues.EndDate.length !== 0 ? "" : "Тугаш санаси киритилмаган"
  
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




