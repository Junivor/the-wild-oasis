import styled from "styled-components";
import {forwardRef} from "react";
import {useSearchParams} from "react-router-dom";
import {useBooking} from "../features/bookings/useBooking.js";
import {useCabin} from "../features/cabins/useCabin.js";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
    props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;


const SelectForm = forwardRef((props, ref) => {
    const { options, render, onChange, disable,  ...register} = props


    return <StyledSelect
        {...register}
        onChange={onChange}
        ref={ref}
        disabled={disable}
    >
        <option value={""}>
            Choose your cabin
        </option>
        {options.map(render)}
    </StyledSelect>

})

export default SelectForm;