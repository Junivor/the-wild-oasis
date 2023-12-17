import Select from "./Select.jsx";
import {useSearchParams} from "react-router-dom";

function SortBy({ sortField, options }) {
    const [searchParams, setSearchParams] = useSearchParams()

    function onChange(e) {
        searchParams.set(sortField, e.target.value)
        setSearchParams(searchParams)
    }

    return <Select
        options={options}
        onChange={onChange}
    />
}

export default SortBy;