import {Slider, TextField} from "@mui/material";
import {Button} from "react-bootstrap";


const SearchAndFiltersGroup = ({ slider_value, min, max, slider_on_change, slider_marks,
                                   text_field_value, text_field_on_change, text_field_label,
                                   loading, button_on_click, button_title}) => {

    return <div id="search-and-filter-group" style={{display: "flex", flexDirection: "column", padding: '20px', border: '2px'}}>
        <TextField id="search-by-title" label={text_field_label} variant="outlined"
                   value={text_field_value}
                   onChange={text_field_on_change}
        />
        <Slider style={{marginTop: '35px'}}
            getAriaLabel={() => 'Temperature range'}
            value={slider_value}
            min={min}
            max={max}
            onChange={slider_on_change}
            valueLabelDisplay="auto"
            marks={slider_marks}
        />
        <div style={{textAlign: "center"}}>Стоимость</div>
        <Button disabled={loading} style={{width: "fit-content", alignSelf: "center", marginTop: '10px'}}
                onClick={button_on_click} className="1">{button_title}</Button>
    </div>
}

export default SearchAndFiltersGroup