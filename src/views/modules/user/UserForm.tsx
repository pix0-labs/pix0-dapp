import {FC, useState, useEffect} from 'react';
import { User } from 'pix0-js';
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { TxHashDiv } from '../../components/TxHashDiv';


type props = {

    userToEdit? : User, 

    isEditMode? : boolean,
}

export const UserForm : FC <props> = ({
    userToEdit, isEditMode
}) =>{

    const [user, setUser] = useState<User>({});
    
    const [txHash, setTxHash] = useState<Error|string>();

    useEffect(()=>{
        if ( isEditMode && userToEdit){
            setUser(userToEdit);
        }
    },[isEditMode, userToEdit]);

    return <CommonAnimatedDiv className="text-center">
    <div className="ml-4 p-2 mt-4 border border-gray-600 rounded-2xl w-5/6 text-left shadow-md">
        <div className="m-2 font-bold bg-transparent p-2 rounded">
        <div className="mb-2 font-bold p-2 rounded-2xl text-gray-200 bg-gray-600">
        {isEditMode ? "Update" : "Create"} Your User Profile
        </div>
        {txHash && <TxHashDiv txHash={txHash}/>}

        <div className="mb-4">
                <TextField label="First Name" value={user.first_name}
                className={commonTextfieldClassName("w-9/12")}
                onChange={(e)=>{
                    setUser({...user, first_name : e.target.value});
                }} />
            </div>
            <div className="mb-4">
                <TextField label="Last Name" value={user.last_name}
                id="last_name" className={commonTextfieldClassName("w-9/12")}
                onChange={(e)=>{
                    setUser({...user, last_name : e.target.value});
                }} />
            </div>
            <div className="mb-4">
                <TextField label="Email" value={user.email} id="email"
                className={commonTextfieldClassName("w-10/12")}
                onChange={(e)=>{
                    setUser({...user, last_name : e.target.value});
                }} />
            </div>

        
        </div>
    </div>
    </CommonAnimatedDiv>
}