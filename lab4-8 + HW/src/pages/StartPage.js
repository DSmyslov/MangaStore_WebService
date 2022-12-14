import React, {useEffect} from 'react';
import { Col, Row, Spinner } from "react-bootstrap";
import MangaCard from "../components/MangaCard";
import SearchAndFiltersGroup from "../components/SearchAndFiltersGroup";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import "../styles/StartPageStyle.css";
import { useSelector, useDispatch } from 'react-redux';
import * as StartPageActionCreators from "../store/actionCreators/StartPageActionCreators";
import {fetchMangaList, fetchStartPageData} from "../store/middlewares/StartPageMiddlewares";
import {user_is_manager} from "../modules";
import {fetchMediaTypes, fetchTitles} from "../store/middlewares/AppMiddlewares";


function StartPage() {

    const text_field_value = useSelector(state => state.ui.StartPage.textFieldValue)
    const manga_pricing = useSelector(state => state.cached_data.StartPage.mangaPricing)
    const slider_value = useSelector(state => state.ui.StartPage.sliderValue)
    const loadingStatus = useSelector(state => state.ui.StartPage.loadingStatus)
    const mangaList = useSelector(state => state.cached_data.StartPage.mangaList)
    const titles = useSelector(state => state.cached_data.App.mangaTitles)
    const mediaTypes = useSelector(state => state.cached_data.App.mangaMediaTypes)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(fetchStartPageData())
        dispatch(fetchMediaTypes())
        dispatch(fetchTitles())

    }, []);

    useEffect(() => {

        if (!loadingStatus) {
            if (slider_value[1] === 0) {
                dispatch(StartPageActionCreators.createAction_setSliderValue(manga_pricing))
            }
            dispatch(StartPageActionCreators.createAction_setTextFieldValue(text_field_value))
        }

    }, [loadingStatus])

    return (
        <>
            <BasicBreadcrumbs props={[
                {
                    ref: '/',
                    text: 'Начальная страница'
                },
                {
                    ref: '/manga',
                    text: 'Список доступной манги'
                }
            ]}/>
            <div className={"page-name"}>Список доступной манги</div>
            <div className={`main-container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus || titles.length === 0 || mediaTypes.length === 0 ?
                    <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div> :
                    <>
                        {manga_pricing[1] === 0 ? undefined:
                            <SearchAndFiltersGroup loading={loadingStatus} text_field_label={"Название манги"}
                                                   button_title={"Найти"} max={manga_pricing[1]} min={manga_pricing[0]}
                                                   slider_value={slider_value}
                                                   slider_on_change={event => {
                                                       dispatch(StartPageActionCreators.createAction_setSliderValue(event.target.value))
                                                   }}
                                                   text_field_value={text_field_value}
                                                   text_field_on_change={event => {
                                                       dispatch(StartPageActionCreators.createAction_setTextFieldValue(event.target.value))
                                                   }}
                                                   button_on_click={() => {
                                                       dispatch(fetchMangaList({
                                                           title: text_field_value,
                                                           min_cost: slider_value[0],
                                                           max_cost: slider_value[1]
                                                       }))
                                                   }}
                                                   slider_marks={[
                                                       {
                                                           value: manga_pricing[0],
                                                           label: `${manga_pricing[0]} ₽`
                                                       },
                                                       {
                                                           value: manga_pricing[1],
                                                           label: `${manga_pricing[1]} ₽`
                                                       }
                                                   ]}
                            />
                        }
                        <div className={"container"}>
                            {!mangaList.length ? <div className={"empty-result-message"}><h1>Манга не найдена :(</h1></div>:
                                <Row xs={1} md={3} sm={2} lg={4} className="grid">
                                    {mangaList.map((item, index) => {
                                        return(
                                            <Col key={index}>
                                                <MangaCard manga={item}
                                                           is_manager={user_is_manager()}
                                                />
                                            </Col>
                                        )
                                    })}
                                </Row>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default StartPage;