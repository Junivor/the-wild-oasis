import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow.jsx";
import {Input} from "../../ui/Input.jsx";
import Button from "../../ui/Button.jsx";
import {useForm} from "react-hook-form";
import {useCreateGuest} from "./useCreateGuest.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

function CreateGuestFrom({ onCloseModal }) {
    const { isCreating, createGuest } = useCreateGuest()
    const isValidEmail = email =>
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );

    const {
        register,
        formState,
        handleSubmit,
        reset
    } = useForm()
    const { errors } = formState

    function onSubmit(data) {
        createGuest({
            ...data,
            countryFlag: `https://flagcdn.com/${data.countryFlag}.svg`
        }, {
            onSettled: () => {
                reset()
                onCloseModal?.()
            }
        })
    }

    return (
        <Form
            type={onCloseModal ? "modal" : "regular"}
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormRow
                label={"Guest full name"}
                error={errors?.fullName?.message}
            >
                <Input
                    type={"text"}
                    id={"fullName"}
                    {...register("fullName", {
                        required: "This field is required!"
                    })}
                />
            </FormRow>

            <FormRow
                label={"Guest email"}
                error={errors?.email?.message}
            >
                <Input
                    type={"text"}
                    id={"email"}
                    {...register("email", {
                        required: "This field is required!",
                        validate: value => !isValidEmail(value)
                            ? "Email is not valid"
                            : null
                    })}
                />
            </FormRow>

            <FormRow
                label={"Guest national"}
                error={errors?.nationality?.message}
            >
                <Input
                    type={"text"}
                    id={"nationality"}
                    {...register("nationality", {
                        required: "This field is required!"
                    })}
                />
            </FormRow>

            <FormRow
                label={"National abbreviation"}
                error={errors?.countryFlag?.message}
            >
                <Input
                    type={"text"}
                    id={"countryFlag"}
                    {...register("countryFlag", {
                        required: "This field is required!"
                    })}
                />
            </FormRow>

            <FormRow
                label={"Guest national Id"}
                error={errors?.nationalId?.message}
            >
                <Input
                    type={"text"}
                    id={"nationalID"}
                    {...register("nationalID", {
                        required: "This field is required!"
                    })}
                />
            </FormRow>

            <FormRow>
                <Button
                    variations={"secondary"}
                    onClick={onCloseModal}
                    disabled={isCreating}
                >
                    Cancel
                </Button>
                <Button>
                    { isCreating ? <SpinnerMini /> : "Add guest"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateGuestFrom;