import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";


import {Input} from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow.jsx";

import {createCabin} from "../../services/apiCabins.js";


function CreateCabinForm() {
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState
    } = useForm()
    const { errors } = formState
    const queryClient = useQueryClient()


    const { isLoading: isCreating, mutate } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created")
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            })
            reset()
        },
        onError: error => toast.error(error)
    })



    function onSubmit(data) {
        console.log("CreateCabinForm: ", data)
        mutate({...data, image: data.image[0]})
    }

    function onError(errors) {
        console.log(errors)
    }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
                        +value >= +getValues().regularPrice
                            ? "Discount should be less than regular price"
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
                {...register("image")}
            />
        </FormRow>


      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
