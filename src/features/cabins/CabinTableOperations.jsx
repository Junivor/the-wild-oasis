import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy.jsx";

function CabinTableOperations() {

    return <TableOperations>
        <Filter
            filterField={"discount"}
            options={[
                { value: "all", label: "All" },
                { value: "no-discount", label: "No discount" },
                { value: "with-discount", label: "With discount" }
            ]}
        />

        <SortBy
            sortField={"sortBy"}
            options={[
                { value: "name-asc", label: "Sort by name (A - Z)"},
                { value: "name-desc", label: "Sort by name (Z - A)"},
                { value: "maxCapacity-asc", label: "Sort by capacity (low - height)"},
                { value: "maxCapacity-desc", label: "Sort by capacity (height - low)"},
                { value: "regularPrice-asc", label: "Sort by regular price (low - height)"},
                { value: "regularPrice-desc", label: "Sort by regular price (height - low)"},
            ]}
        />
    </TableOperations>
}

export default CabinTableOperations;