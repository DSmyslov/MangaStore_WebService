import React, {useEffect, useState} from 'react';
import {Col, Row, Spinner} from "react-bootstrap";
import MangaCard from "../components/MangaCard";
import InputField from "../components/InputField";
import {getMangaList, getMangaByName} from "../modules";
import "../styles/StartPageStyle.css";


function StartPage() {

    const [searchValue, setSearchValue] = useState('');

    const [loading, setLoading] = useState(true);

    const [manga, setManga] = useState([]);

    const handleSearch = async () => {
        await setLoading(true);
        if (searchValue==='') {
            await setManga(await getMangaList());
            await setLoading(false);
        }
        else {
            await setManga(await getMangaByName(searchValue));
            await setLoading(false);
        }
    }

    useEffect(() => {

        console.log('Пытаемся получить список манги');
        handleSearch();

    }, []);

    return (
        <>
            <div className={"page-name"}>Список доступной манги</div>
            <div className={`main-container ${loading && 'containerLoading'}`}>
                <InputField value={searchValue} setValue={setSearchValue}
                            loading={loading} placeholder={"Поиск по названию манги"}
                            onSubmit={handleSearch} buttonTitle="Поиск"/>
                {loading ? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                    <div className={"container"}>
                        {!manga.length ? <div className={"empty-result-message"}><h1>Манга не найдена :(</h1></div>:
                            <Row xs={1} md={3} sm={2} lg={4} className="grid">
                                {manga.map((item, index) => {
                                    return(
                                        <Col key={index}>
                                            <MangaCard {...item}/>
                                        </Col>
                                    )
                                })}
                            </Row>
                        }
                    </div>
                }
            </div>
        </>
    );
}

export default StartPage;