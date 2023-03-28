import {FC, useState, useEffect} from 'react';
import { User } from 'pix0-js';
import usePage from '../../../hooks/usePage';
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import useUserContract from '../../../hooks/useUserContract';
import { TxHashDiv } from '../../components/TxHashDiv';
import { PulseLoader } from 'react-spinners';
import { FcCancel } from 'react-icons/fc';
import { Page } from '../../../sm/PageActions';
import { encrypt, decrypt } from 'pix0-react';


type props = {

    userToEdit? : User, 

    isEditMode? : boolean,
}

export const UserForm : FC <props> = ({
    userToEdit, isEditMode
}) =>{

    const [user, setUser] = useState<User>({});
    
    const [txHash, setTxHash] = useState<Error|string>();

    const [processing, setProcessing] = useState(false);

    const {createUser, updateUser} = useUserContract();

    const unsetTxHash = () =>{

        setTimeout(()=>{
            setTxHash(undefined);
        },7000);
    }

    const saveUser = async () =>{

        console.log("coll.x::user::", user);

        setProcessing(true);

        if ( isEditMode ) {

            let tx = await updateUser(user);
            setTxHash(tx);

            if ( tx instanceof Error){
                unsetTxHash();
            }
        }
        else {

            if ( user.first_name?.trim() === "") {
                setTxHash(new Error('First Name is blank!'));
                unsetTxHash();
                setProcessing(false);
                return;
            }

            if ( user.last_name?.trim() === "") {
                setTxHash(new Error('Last name is blank!'));
                unsetTxHash();
                setProcessing(false);
                return;
            }

            let tx = await createUser(user);
            
            setTxHash(tx);

            if ( tx instanceof Error){
                unsetTxHash();
            }
        }

        setProcessing(false);
    }

    const {setPage} = usePage();


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
                <TextField label="User Name" id="user_name" value={user.user_name}
                className={commonTextfieldClassName("w-5/12")} readOnly={isEditMode}
                onChange={(e)=>{
                    setUser({...user, user_name : e.target.value});
                }} />
            </div>
            <div className="mb-4">
                <TextField label="First Name" id="first_name" value={user.first_name}
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
                <TextField label="Email (Optional)" value={decrypt(user.email ?? "")} id="email"
                className={commonTextfieldClassName("w-10/12")}
                onChange={(e)=>{
                    setUser({...user, email :  encrypt(e.target.value)});
                }} />
            </div>
            <div className="mb-4">
                <TextField label="Mobile (Optional)" value={user.mobile} id="mobile"
                className={commonTextfieldClassName("w-6/12")}
                onChange={(e)=>{
                    setUser({...user, mobile : e.target.value});
                }} />
            </div>

            <div className="mb-4 bg-gray-700 p-2 rounded">
            <button className="mr-2 bg-cyan-900 rounded-3xl p-2 text-gray-200" 
            style={{width:"150px"}} disabled={processing}
            onClick={async (e)=>{
                e.preventDefault();
                await saveUser();
            }}>{processing ? <PulseLoader color="#eee" margin={2}/> 
            : <>{isEditMode ? "Update" : "Create"}</>}</button>

            <button className="ml-2 bg-gray-600 rounded-3xl p-2 text-gray-200" 
            style={{width:"150px"}} disabled={processing}
            onClick={(e)=>{
                e.preventDefault();

                setPage(Page.CreateCollection);

            }}><FcCancel className="inline mb-1"/> Close</button>
            </div>
        
        </div>
    </div>
    </CommonAnimatedDiv>
}