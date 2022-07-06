import http from "../service/EventService";
import authHeader from "./Auth-Header";


const getAll = () => {
    return http.get("/bookings");
};
const get = id => {
    return http.get(`/bookings/${id}`);
};
const create = (data) => {
    return http.post("/bookings", data,{ headers: authHeader() });
};
const update = (id, data) => {
    return http.put(`/bookings/${id}`, data);
};
const remove = id => {
    return http.delete(`/bookings/${id}`);
};
const removeAll = () => {
    return http.delete(`/bookings`);
};
const findByTitle = title => {
    return http.get(`/bookings?title=${title}`);
};
const BookingService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};
export default BookingService;