import {useForm} from "react-hook-form";
import {useRef} from "react";

import {useCabin} from "../cabins/useCabin.js";
import {useSettings} from "../settings/useSettings.js";
import {useGetAllCabins} from "../cabins/useGetAllCabins.js";
import {useSearchParams} from "react-router-dom";
import {useGetAllGuests} from "../guests/useGetAllGuests.js";
import {useEditBooking} from "./useEditBooking.js";

import {
    convertDateToISO,
    formatCurrency,
    getOptionalBreakfastPrice,
    subtractDates
} from "../../utils/helpers.js";

import FormRow from "../../ui/FormRow.jsx";
import Form from "../../ui/Form.jsx";
import {Input} from "../../ui/Input.jsx";
import Textarea from "../../ui/Textarea.jsx";
import Button from "../../ui/Button.jsx";
import SelectForm from "../../ui/SelectForm.jsx";
import Spinner from "../../ui/Spinner.jsx";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import CheckBox from "../../ui/Checkbox.jsx";


function EditBookingForm({ bookingToEdit, onCloseModal }) {
    const selectRef = useRef(null)
    const checkboxRef = useRef(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: bookingToEdit })


    const {
        numGuests,
        startDate,
        endDate,
        hasBreakfast,
    } = watch()

    const { isLoading: cabinsSearch, cabins } = useGetAllCabins()
    const { isLoading: guestsSearch, guests } = useGetAllGuests()

    const { isLoading, cabin} = useCabin()
    const { isLoadingSettings, settings } = useSettings()
    const { isEditing, editBooking } = useEditBooking()

    const isSearching = (cabinsSearch || guestsSearch || isLoadingSettings)

    if (isSearching) return <Spinner />

    const cabinOptions = cabins.map(cabin => {
        return {
            label: `Cabin #${cabin.name}`,
            value: cabin.id
        }
    })

    const guestsOptions = guests.map(guest => {
        return {
            label: guest.fullName,
            value: guest.id
        }
    })

    const numNights = subtractDates(endDate, startDate)
    const breakfastPrice = getOptionalBreakfastPrice(
        numGuests,
        startDate,
        endDate,
        settings.breakfastPrice
    )
    const totalPrice = cabin?.regularPrice ? +(cabin.regularPrice - cabin.discount + (hasBreakfast ? breakfastPrice : 0)) : 0

    function handleChange(e) {
        if (!e.target.value) return null

        searchParams.set("selected", e.target.value)
        setSearchParams(searchParams)
    }

    function onSubmit(data) {
        editBooking({
            bookingId: data.id,
            updatedData: {
                ...data,
                numNights,
                totalPrice,
                extrasPrice: breakfastPrice,
                cabinPrice: cabin.regularPrice,
                startDate: convertDateToISO(data.startDate),
                endDate: convertDateToISO(data.endDate),
            }
        })
    }

    function onError(data) {
        console.log(data)
    }


    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular" }
        >
            <FormRow
                label={"From"}
                error={errors?.startDate?.message}
            >
                <Input
                    {...register("startDate", {
                        required: "This field is required!"
                    })}
                    id={"startDate"}
                    type={"date"}
                />
            </FormRow>

            <FormRow
                label={"To"}
                error={errors?.endDate?.message}
            >
                <Input
                    {...register("endDate", {
                        required: "This field is required!"
                    })}
                    id={"endDate"}
                    type={"date"}
                />
            </FormRow>

            <FormRow
                label={"Cabin"}
            >
                <SelectForm
                    ref={selectRef}
                    {...register("cabinId")}
                    options={cabinOptions}
                    onChange={handleChange}
                    render={option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            { option.label }
                        </option>
                    )}
                />
            </FormRow>

            <FormRow
                label={"Guest booking"}
            >
                <SelectForm
                    disable={true}
                    {...register("guestId")}
                    options={guestsOptions}
                    render={option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            { option.label }
                        </option>
                    )}
                />
            </FormRow>

            <FormRow
                label={"Number of guests"}
                error={errors?.numGuests?.message}
            >
                {isLoading ? <SpinnerMini />
                    : <Input
                        {...register("numGuests", {
                            required: "This field is required",
                            validate: value => {
                                return value > cabin.maxCapacity
                                    ? `Sorry, but this cabin can handle ${cabin.maxCapacity}`
                                    : null
                            }
                        })}
                        id={"numGuests"}
                        placeholder={`Guests can hold on to ${cabin?.maxCapacity || ""}`}
                    />
                }
            </FormRow>

            <FormRow
                label={"Some mentions?"}
            >
                <Textarea
                    {...register("observations")}
                    id={"observations"}
                    type={"text-area"}
                />
            </FormRow>


            <FormRow
                label={"Breakfast include?"}
            >
                <CheckBox
                    ref={checkboxRef}
                    {...register("hasBreakfast")}
                    id={"hasBreakfast"}
                >
                    Want to add breakfast for {breakfastPrice ? formatCurrency(breakfastPrice) : ""}
                </CheckBox>
            </FormRow>

            <FormRow label={"Cabin price"}>
                {isLoading ? <SpinnerMini /> :
                    <Input
                        {...register("cabinPrice")}
                        value={
                            cabin?.regularPrice
                                ? formatCurrency(cabin.regularPrice)
                                : 0
                        }
                        id={"cabinPrice"}
                        disabled={true}
                    />
                }
            </FormRow>

            <FormRow label={"Total price"}>
                {isLoading ? <SpinnerMini /> :
                    <Input
                        {...register("totalPrice")}
                        value={
                            cabin?.regularPrice
                                ? hasBreakfast
                                    ? `${formatCurrency(totalPrice)} (Cabin + Breakfast + Discount)`
                                    : formatCurrency(cabin.regularPrice)
                                : ""
                        }
                        id={"totalPrice"}
                        disabled={true}
                    />
                }
            </FormRow>

            <FormRow>
                <Button
                    variations={"secondary"}
                    onClick={onCloseModal}
                    disabled={isEditing}
                >
                    Cancel
                </Button>

                <Button disabled={isEditing}>
                    { isEditing ? <SpinnerMini /> : "Update booking"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default EditBookingForm;