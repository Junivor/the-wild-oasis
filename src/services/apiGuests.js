import supabase from "./supabase.js";
import {PAGE_SIZE} from "../utils/constants.js";
import {gu} from "date-fns/locale";

export async function getGuests({ page }) {
    let query = supabase
        .from("guests")
        .select("*", { count: "exact" })

    if (page) {
        const from = (page - 1) * PAGE_SIZE
        const to = page * PAGE_SIZE - 1

        query.range(from, to)
    }

    const { data, count } = await query

    return {data, count}
}

export async function createGuest(newGuest) {
    const generateId = Math.round(Math.random() * 999)

    await supabase
        .from("guests")
        .insert([{...newGuest, id: generateId}])
}

export async function editGuest(guestId, changedGuest) {
    const { data } = await supabase
        .from("guests")
        .update(changedGuest)
        .eq("id", guestId)
        .select()
        .single()

    return data
}

export async function deleteGuest(guestId) {
    await supabase
        .from("guests")
        .delete()
        .eq("id", guestId)
}