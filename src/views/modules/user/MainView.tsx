import { FC } from "react";
import { useUserContract } from "../../../hooks/useUserContract";
import { UserForm } from "./UserForm";

export const MainView : FC = () =>{

    const {currentUser, loading} = useUserContract();

    const switchView = () =>{

        if ( currentUser !== undefined){

            return <UserForm userToEdit={currentUser} isEditMode={true} loading={loading}/>
        }
        else {

            return <UserForm/>
        }
    }

    return switchView();

}
