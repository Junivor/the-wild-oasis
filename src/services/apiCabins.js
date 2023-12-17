import supabase, {supabaseUrl} from "./supabase.js";
import {PAGE_SIZE} from "../utils/constants.js";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import * as path from "path";
import {createImagePath, getImagePath} from "../utils/helpers.js";

async function uploadImage(uniqueImageName, fileBody, cabinId) {
    const { error } = await supabase
        .storage
        .from("cabins-images")
        .upload(uniqueImageName, fileBody)

    if (error) {
        await supabase
            .from("cabins")
            .delete()
            .eq("id", cabinId)

        throw new Error("Something went wrong went we upload image, so we deleted it!")
    }
}

async function updateImage(imagePath, fileBody) {
    await supabase
        .storage
        .from("cabins-images")
        .update(imagePath, fileBody)

}

async function deleteImage(imagePath) {
    await supabase
        .storage
        .from("cabins-images")
        .remove(imagePath)
}

export async function getCabins({ filter, sort, page }) {
    const query = supabase
        .from("cabins")
        .select("*", { count: "exact" })

    if (filter)
        query[filter.value ? "gte" : "eq"](filter.field, filter.value)

    if (sort)   
        query.order(sort.field, { ascending: sort.ascending })

    if (page) {
        const from = (page - 1) * PAGE_SIZE
        const to = page * PAGE_SIZE - 1

        query.range(from, to)
    }

    const { data, count } = await query
    return { data, count }
}

export async function getCabin(id) {
    const { data } = await supabase
        .from("cabins")
        .select("maxCapacity, regularPrice, discount")
        .eq("id", id)
        .single()

    return data
}

export async function createCabin(newCabin) {
    const { uniqueImageName, imagePath } = createImagePath(newCabin.image.name)

    const { data } = await supabase
        .from("cabins")
        .insert([{ ...newCabin, image: imagePath }])
        .select("id")

    await uploadImage(uniqueImageName, newCabin.image, data.id)
}

export async function duplicateCabin(newCabin) {
    await supabase
        .from("cabins")
        .insert(newCabin)
        .select("id")
}

export async function editCabin(cabinId, newCabin) {
    const [imageUrl, newImage] = newCabin.image
    const imagePath = getImagePath(imageUrl)

    const { data } = await supabase
        .from("cabins")
        .update({ ...newCabin, image: imageUrl })
        .eq("id", cabinId)
        .select("id")
        .single()

    if (newCabin.image[1] === "h") return data;

    await updateImage(imagePath, newImage)
    return data
}

export async function deleteCabin(id, imageUrl) {
    const imagePath = getImagePath(imageUrl)

    await supabase
        .from("cabins")
        .delete()
        .eq("id", id)

    await deleteImage(imagePath)
}