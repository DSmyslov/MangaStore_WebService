import { useSelector, useDispatch } from "react-redux";
import {useEffect} from "react";


function UserPurchasesPage() {

    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)

    const userCart = useSelector(state => state.cached_data.App.userCart)

    const dispatch = useDispatch()

    useEffect(() => {



    }, [])

    return (
        <>
            {!userStatus ? <div style={{marginTop: "10px", fontSize: "20px"}}>
                    Пожалуйста, авторизуйтесь для просмотра вашего списка заказов</div>:
                <div style={{marginTop: "10px", fontSize: "20px"}}>
                    Ваши заказы

                </div>
            }
        </>
    )
}

export default UserPurchasesPage