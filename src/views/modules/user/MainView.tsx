import { FC } from "react";
import { useUserContract } from "../../../hooks/useUserContract";
import { UserForm } from "./UserForm";

export const MainView : FC = () =>{

    const {currentUser} = useUserContract();

    const switchView = () =>{

        if ( currentUser !== undefined){

            return <UserForm userToEdit={currentUser} isEditMode={true}/>
        }
        else {

            return <UserForm/>
        }
    }

    return switchView();

}
