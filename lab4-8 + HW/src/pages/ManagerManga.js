import React, {useEffect, useState} from "react"
import {Button, Spinner} from "react-bootstrap"
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import api_socket from "../network";
import {fetchMediaTypes, fetchTitles} from "../store/middlewares/AppMiddlewares";
import {useDispatch, useSelector} from "react-redux";
import {user_is_manager} from "../modules";


function ManagerManga() {

    const [loading, setLoading] = useState(false);
    const [btnLoading, setbtnLoading] = useState(false);
    const mangaTypes = useSelector(state => state.cached_data.App.mangaMediaTypes);
    const userStatus = useSelector(state => state.cached_data.App.userAuthorized);
    const [nameField, setNameField] = useState('');
    const [costField, setCostField] = useState('');
    const [qtyField, setQtyField] = useState('');
    const [releaseDate, setReleaseDate] = useState(null);
    const [synopsis, setSynopsis] = useState('');
    const dispatch = useDispatch()

    useEffect(() => {

        const loadData = async () => {
            setLoading(true)
            await dispatch(fetchMediaTypes())
            setLoading(false)
        }
        loadData()

    }, [])

    return (
        <div
            className={"container"}
            style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px"
            }}
        >
            <div
                style={{
                    fontSize: "20px",
                    textAlign: "center",
                    marginBottom: "20px"
                }}
            >
                Добавление новой манги
            </div>
            {loading || !user_is_manager() || !userStatus ?
                <div
                    className={"hide-while-loading-page"}
                    style={{
                        alignSelf: "center"
                    }}
                >
                    <Spinner animation={"border"}/>
                </div>:
                <>
                    <TextField
                        required={true}
                        id="change-manga-name"
                        label={"Название манги"}
                        variant="outlined"
                        value={nameField}
                        onChange={event => {
                            event.preventDefault()
                            setNameField(event.target.value)
                        }}
                        style={{width:"100%"}}
                    />
                    <TextField
                        id="change-manga-qty"
                        label={"Количество на складе"}
                        variant="outlined"
                        value={qtyField}
                        onChange={event => {
                            event.preventDefault()
                            setQtyField(event.target.value)
                        }}
                        style={{width:"100%"}}
                    />
                    <TextField
                        id="change-manga-cost"
                        label={"Стоимость манги"}
                        variant="outlined"
                        value={costField}
                        onChange={event => {
                            event.preventDefault()
                            setCostField(event.target.value)
                        }}
                        style={{width:"100%"}}
                    />
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                    >
                        <DatePicker
                            label="Дата выхода"
                            value={releaseDate}
                            onChange={(newValue) => {
                                setReleaseDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            inputFormat="DD/MM/YYYY"
                        />
                    </LocalizationProvider>
                    <TextField
                        id="change-manga-synopsis"
                        label={"Описание манги"}
                        variant="outlined"
                        value={synopsis}
                        onChange={event => {
                            event.preventDefault()
                            setSynopsis(event.target.value)
                        }}
                        style={{width:"100%"}}
                        multiline={true}
                        rows={10}
                    />
                    <Button
                        disabled={btnLoading}
                        onClick={event => {
                            event.preventDefault()
                            setbtnLoading(true)
                            let body = {}
                            if (nameField !== '') body.manga_name = nameField
                            if (qtyField !== '') body.quantity_in_stock = qtyField
                            if (costField !== '') body.cost = costField
                            if (releaseDate) body.release_date = new Date(releaseDate).toISOString().split('T')[0]
                            if (synopsis !== '') body.synopsis = synopsis
                            const options = {
                                method: 'POST',
                                credentials: "include",
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8',
                                    "X-CSRFToken": document.cookie
                                        .split('; ')
                                        .filter(row => row.startsWith('csrftoken='))
                                        .map(c => c.split('=')[1])[0]
                                },
                                body: JSON.stringify(body)
                            }
                            fetch(`http://${api_socket}/manga/`, options)
                                .then(response => {
                                    response.json()
                                    setbtnLoading(false)
                                })
                                .then(response => {
                                    console.log(response)
                                    setbtnLoading(false)
                                })
                                .catch(err => {
                                    console.error(err)
                                    setbtnLoading(false)
                                });
                        }}
                    >
                        Добавить мангу
                    </Button>
                </>
            }
        </div>
    )
}

export default ManagerManga