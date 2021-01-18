
import { authHeader } from '../redux/helpers';
import axios from 'axios'
import { base_url } from '../utils/constants'
export const userService = {
    login,
    logout,
    createCreditApp,
    getInProcessApps,
    getInProcessAppsDetailed,
    editProblemCredit,
    signUp,
    getBranches,
    getRoles,
    createBranch,
    updateBranch,
    usersAll,
    editUser,
    deleteUser,
    getArchievedApps,
    getArchievedAppsById,
    DeleteEditApp,
    downloadTable,
    downloadConvertedData,
    getFormFileTypes,
    getReport,
    changePendingStatus,
    getFileTypes,
    updateFileType,
    createFileType,
    hideInprocess,
    updateComment,
    showHidden,
    showHiddenById,

};

function login(username, password) {
    const requestOptions = {
        username, password,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios.post(`${base_url}/users/login`, requestOptions)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('user', JSON.stringify(user));

            console.log(user);
            return user;
        })
}
function signUp(data) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.post(`${base_url}/users/signup`, data, requestOptions)

}

function getRoles() {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/primaryLawyer/getRoles`, requestOptions)

}
function createBranch(data) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.post(`${base_url}/primaryLawyer/createBranch`, data, requestOptions)

}
function getBranches() {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/primaryLawyer/getBranches`, requestOptions)

}
function updateBranch(EditBranchId, data) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.patch(`${base_url}/primaryLawyer/updateBranch/${EditBranchId}`, data, requestOptions)

}

function usersAll() {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/primaryLawyer/usersAll`, requestOptions)

}
function deleteUser(id) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.delete(`${base_url}/primaryLawyer/deleteUser/${id}`, requestOptions)
}
function editUser(editUsers, data) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.patch(`${base_url}/primaryLawyer/updateUser/${editUsers}`, data, requestOptions)

}
function createCreditApp(formData) {
    const requestOptions = {
        headers: authHeader(),

    };
    return axios.post(`${base_url}/lawyer/createCreditApp`, formData, requestOptions)

}

function getInProcessApps(branchId) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/lawyer/getInProcessApps/branch/${branchId}`, requestOptions)
}

function getInProcessAppsDetailed(branchId, inporcessId) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/lawyer/getInProcessAppsDetailed/branch/${branchId}/id/${inporcessId}`, requestOptions)
}
function DeleteEditApp(id) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.delete(`${base_url}/lawyer/DeleteProblemCredit/${id}`, requestOptions)
}

function getArchievedApps(id) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/lawyer/getArchievedApps/${id}`, requestOptions)
}

function getArchievedAppsById(branchId, inporcessId) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/lawyer/getArchievedAppsById/branch/${branchId}/id/${inporcessId}`, requestOptions)

}
function editProblemCredit(editId, formData, ) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.post(`${base_url}/lawyer/editProblemCredit/${editId}`, formData, requestOptions)
}
function downloadTable(id) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/primaryLawyer/downloadtable`, requestOptions)
}
function downloadConvertedData(id) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/files/report/${id}`, requestOptions)
}
function getFormFileTypes() {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/primaryLawyer/getFileTypes/`, requestOptions)
}
function changePendingStatus(appPendingId) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/primaryLawyer/changePendingStatus/${appPendingId}`, requestOptions)
}
function hideInprocess(id) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/primaryLawyer/hideInprocess/${id}`, requestOptions)
}


function getReport(branchId, startDate, endDate) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/primaryLawyer/getReport/branch/${branchId}/start/${startDate}/end/${endDate}`, requestOptions)
}
function getFileTypes() {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.get(`${base_url}/primaryLawyer/getFileTypes`, requestOptions)
}
function updateFileType(id, data) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.patch(`${base_url}/primaryLawyer/updateFileType/${id}`, data, requestOptions)
}
function createFileType(data) {
    const requestOptions = {
        headers: authHeader()
    };
    return axios.post(`${base_url}/primaryLawyer/createFileType/`, data, requestOptions)
}
function updateComment(id,data) {
    const requestOptions = {
        headers: authHeader()
    };
  
    return axios.patch(`${base_url}/primaryLawyer/updateComment/${id}`, data, requestOptions)
}
function showHidden(id) {
    const requestOptions = {
        headers: authHeader()
    };
  
    return axios.get(`${base_url}/primaryLawyer/showHidden/branch/${id}`, requestOptions)
}
function showHiddenById(id) {
    const requestOptions = {
        headers: authHeader()
    };
  
    return axios.get(`${base_url}/primaryLawyer/showInprocess/${id}`, requestOptions)
}



function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('user');


}
