import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PostService from "../services/http-services";
export default function Logout(props){
    const nav = useNavigate();
    useEffect(()=>{
        if(props.sid==null){
            nav("/");
        }else{
            const logoutData = new FormData();
            logoutData.append("sid",props.sid);
            PostService.post("logout",logoutData).then(
                (axObj)=>{
                    if(axObj.status===200){
                        sessionStorage.removeItem("sid");
                        props.sidHandler(null);
                        props.loginUserHandler(null);
                        nav("/");
                    }
                },
                (err)=>{
                    console.log(err.response.data);
                }
            )
        }
    },[]);
}