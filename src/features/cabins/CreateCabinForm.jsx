import {useForm} from "react-hook-form";

import {Input} from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow.jsx";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import {useCreateCabin} from "./useCreateCabin.js";


function CreateCabinForm({ onCloseModal }) {
    const { isCreating, createCabin } = useCreateCabin()
    const {
        register,
        handleSubmit,
        formState,
        getValues,
        reset
    } = useForm()

    const { errors } = formState

    function onSubmit(data) {
        createCabin({
            ...data,
            image: data.image[0]
        }, {
            onSettled: () => {
                reset()
                onCloseModal?.()
            }
        })

    }



  return (
    <Form
        onSubmit={handleSubmit(onSubmit)}
        type={onCloseModal ? "modal" : "regular" }
    >
        <FormRow
            label={"Cabin name"}
            error={errors?.name?.message}
        >
            <Input
                type="text"
                id="name"
                {...register("name", {
                    required: "This field is required"
                })}
            />
        </FormRow>

        <FormRow
            label={"Maximum capacity"}
            error={errors?.maxCapacity?.message}
        >
            <Input
                type="number"
                id="maxCapacity"
                {...register("maxCapacity", {
                    required: "This field is required"
                })}
            />
        </FormRow>

        <FormRow
            label={"Regular price"}
            error={errors?.regularPrice?.message}
        >
            <Input
                type="number"
                id="regularPrice"
                {...register("regularPrice", {
                    required: "This field is required"
                })}
            />
        </FormRow>

        <FormRow
            label={"Discount"}
            error={errors?.discount?.message}

        >
            <Input
                type="number"
                id="discount"
                defaultValue={0}
                {...register("discount", {
                    required: "This field is required",
                    validate: value =>
                        value >= getValues("regularPrice")
                            ? "Discount cant be higher than regular price!"
                            : null

                })}
            />
        </FormRow>

        <FormRow
            label={"Description for website"}
            error={errors?.description?.message}
        >
            <Textarea
                type="number"
                id="description"
                defaultValue=""
                {...register("description", {
                    required: "This field is required"
                })}
            />
        </FormRow>

        <FormRow
            label={"Cabin photo"}
            error={errors?.image?.message}
        >
            <FileInput
                id="image"
                accept="image/*"
                {...register("image", {
                    required: "This field is required"
                })}
            />
        </FormRow>


      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
            variations="secondary"
            type="reset"
            disabled={isCreating}
            onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>
            { isCreating ? <SpinnerMini /> : "Add cabin" }
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
