import React from "react";
import "../styles/MangaFullInfoStyle.css";

const MangaFullInfo = (manga) => {
    return <>
        <div className={"manga-name"}>
            {manga.manga_name}
        </div>
        <div className={"manga-title"}>
            Тайтл: {manga.title.title_name_eng? manga.title.title_name_eng:
            (manga.title.title_name_rus? manga.title.title_name_rus: manga.title.title_name_jp)}
        </div>
        <div className={"manga-media-type"}>
            Тип издания: {manga.type.type_name}
        </div>
        {manga.release_date? <div className={"manga-release-date"}>
            Дата публикации: {manga.release_date}
        </div>:null}
        {manga.synopsis? <div className={"manga-synopsis"}>
            Описание: {manga.synopsis}
        </div>:null}
    </>
}

export default MangaFullInfo;