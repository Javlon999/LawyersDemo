import React from 'react'
import RegistrationForm from "./RegistrationForm";
import PageHeader from "../../components/PageHeader";

export default function Registration() {

    return (
        <div>
            <PageHeader
                title="Руйхатга олиш"
            />
            <RegistrationForm />
        </div>
    )
}