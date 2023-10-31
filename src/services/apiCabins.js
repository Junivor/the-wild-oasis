import supabase, {supabaseUrl} from "./supabase.js";
import {PAGE_SIZE} from "../utils/constants.js";

export async function getCabins({ page }) {
    let query= supabase
        .from('cabins')
        .select("*", { count: "exact"})

    if (page) {
        const from = (page - 1) * PAGE_SIZE
        const to = page * PAGE_SIZE - 1
        query = query.range(from, to)
    }

    const { data, error, count } = await query

    if (error) {
        console.error(error)
        throw new  Error("Cabin could not be loaded")
    }

    return {data, count}
}

export async function createAndEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

    const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", '')


    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`

    console.log('hi')
    //1. Create/Edit CABIN
    let query = supabase.from("cabins")

    // A) CREATE
    if (!id) {
        query = query
            .insert([{...newCabin, image: imagePath}])
    }

    // B) EDIT
    if (id) {
        query = query
            .update({...newCabin, image: imagePath})
            .eq('id', id)
    }

    const { data, error } = await query
        .select()
        .single()

    if (error) {
        throw new Error("Cabin could not be created")
    }

    //2. Upload image
    if (hasImagePath) return data

    const { error: storageError } = await supabase
        .storage
        .from('cabins-images')
        .upload(imageName, newCabin.image)


    //3. Delete the cabin IF there was an error uploading image
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)

        throw new Error("Cabin image could not be uploaded and the cabin was not created")
    }

    return data
}

export async function deleteCabin(id) {
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        throw new  Error("Cabin could not be deleted")
    }
}