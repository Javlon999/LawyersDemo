
import { useForm } from '../../components/useForm';
export function Validation() {

    const initialFValues = {
        id: 0,
        name: '',
        surname: '',
        middlename:'',
        login: '',
        passport: '',
        branch: '',
        role: '',
        acive:'',
        
        isPermanent: false,
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('name' in fieldValues)
            temp.name = fieldValues.name.length !== 0 ? "" : " исм ёзилмаган"
        if ('surname' in fieldValues)
            temp.surname = fieldValues.surname.length !== 0 ? "" : "Фамилия ёзилмаган"
        if ('middlename' in fieldValues)
            temp.middlename = fieldValues.middlename.length !== 0 ? "" : "Шариф  ёзилмаган"
        if ('login' in fieldValues)
            temp.login = fieldValues.login.length !== 0 ? "" : "Логин ёзилмаган"
        if ('passport' in fieldValues)
            temp.passport = fieldValues.passport.length !== 0 ? "" : "Password  ёзилмаган"
        if ('branch' in fieldValues)
            temp.branch = fieldValues.branch.length !== 0 ? "" : "Филиал танланмаган"
        if ('role' in fieldValues)
            temp.role = fieldValues.role.length !== 0 ? "" : "Кимлиги хакида малумот танланмаган"

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




