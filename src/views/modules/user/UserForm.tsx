import {FC, useState, useEffect} from 'react';
import { User } from 'pix0-js';
import usePage from '../../../hooks/usePage';
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import useUserContract from '../../../hooks/useUserContract';
import { NFTsSelPopup } from './NFTsSelPopup';
import { TxHashDiv } from '../../components/TxHashDiv';
import { Page } from '../../../sm/PageActions';
import { USE_NFT_AS_PROFILE_IMG} from 'pix0-js';
import { ProceedOrCancelButtons } from '../../components/ProceedOrCancelButtons';
import { encrypt, decrypt } from 'pix0-react';
import { PulseLoader } from 'react-spinners';

type props = {

    userToEdit? : User, 

    isEditMode? : boolean,

    loading? : boolean, 
}

export const UserForm : FC <props> = ({
    userToEdit, isEditMode, loading
}) =>{

    const [user, setUser] = useState<User>({});
    
    const [selectedTokenId, setSelectedTokenId] = useState<string>();

    const [txHash, setTxHash] = useState<Error|string>();

    const [processing, setProcessing] = useState(false);

    const {createUser, updateUser} = useUserContract();

    const unsetTxHash = () =>{

        setTimeout(()=>{
            setTxHash(undefined);
        },7000);
    }

    const saveUser = async () =>{

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
            if ( userToEdit.profile_image?.pic_type === USE_NFT_AS_PROFILE_IMG) {
                setSelectedTokenId(userToEdit.profile_image.value);
            }
        }
    },[isEditMode, userToEdit]);


    const selectNft = (tokenId : string, _imageUrl? : string ) =>{

        let pimg = {pic_type : USE_NFT_AS_PROFILE_IMG, value: tokenId};
        setUser({...user, profile_image : pimg });
        setSelectedTokenId(tokenId);
    }

    return <CommonAnimatedDiv className="text-center">
    <div className="ml-4 p-2 mt-4 border border-gray-600 rounded-md w-full text-left shadow-md"
    style={{width:"98%"}}>
        <div className="m-2 font-bold bg-transparent p-2 rounded">
        <div className="mb-2 font-bold p-2 rounded-2xl text-gray-200 bg-gray-600">
        {isEditMode ? "Update" : "Create"} Your User Profile {loading && <PulseLoader size={"10"}
        style={{display:"inline-block", marginLeft:"4px", marginTop:"2px"}} color="white"/>}
        </div>
        {txHash && <TxHashDiv txHash={txHash}/>}
            <div className="mb-4" title="Click to change profile icon">
                <NFTsSelPopup selectNft={selectNft} selectedTokenId={selectedTokenId}/>
            </div>

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
                <TextField label="Bio" value={user.bio ?? ""} id="bio"
                className={commonTextfieldClassName("w-10/12")}
                onChange={(e)=>{
                    setUser({...user, bio : e.target.value});
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
                <TextField label="Mobile (Optional)" value={decrypt(user.mobile ?? "")} id="mobile"
                className={commonTextfieldClassName("w-6/12")}
                onChange={(e)=>{
                    setUser({...user, mobile : encrypt(e.target.value)});
                }} />
            </div>

            <ProceedOrCancelButtons proceedAction={saveUser} cancelAction={()=>{
                setPage(Page.Collectibles)
            }} processing={processing} proceedButtonText={isEditMode ? "Update" : "Create"}
            cancelButtonText="Cancel"/>
        
        </div>
    </div>
    </CommonAnimatedDiv>
}