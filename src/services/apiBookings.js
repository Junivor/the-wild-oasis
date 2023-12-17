import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import {PAGE_SIZE} from "../utils/constants.js";
//query[filter.method || "eq"]
export async function getBookings({ filter, sort, page }) {
  const query = supabase
      .from("bookings")
      .select("*, guests(id, fullName, email), cabins(id, name)", { count: "exact" })

  if (filter)
    query.eq(filter.field, filter.value)

  if (sort)
    query.order(sort.field, { ascending: sort.ascending })

  if (page) {
    const from = (page - 1) * PAGE_SIZE
    const to = page * PAGE_SIZE - 1

    query.range(from, to)
  }

  const { data , count } = await query

  return { data, count }
}

export async function getBooking(id) {

  const { data } = await supabase
      .from("bookings")
      .select("*, guests(*), cabins(*)")
      .eq("id", id)
      .single()

  return data
}

// Returns all BOOKINGS that are were created after the given date.
// Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
      .from("bookings")
      .select("*, guests(fullName, nationality, countryFlag)")
      .or(
          `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
      )
      .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function createBooking(newBooking) {
  await supabase
      .from("bookings")
      .insert(newBooking)
}

export async function updateBooking(id, obj) {
  console.log(id, obj)

  const { data } = await supabase
      .from("bookings")
      .update(obj)
      .eq("id", id)
      .select("id")
      .single()

  return data
}

export async function deleteBooking(id) {
  await supabase
      .from("bookings")
      .delete()
      .eq("id", id)

}


