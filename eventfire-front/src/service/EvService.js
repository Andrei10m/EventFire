import http from "../service/EventService";
const getAll = () => {
    return http.get("/events");
};
const get = id => {
    return http.get(`/events/${id}`);
};
const create = data => {
    return http.post("/events", data);
};
const update = (id, data) => {
    return http.put(`/events/${id}`, data);
};
const remove = id => {
    return http.delete(`/events/${id}`);
};
const removeAll = () => {
    return http.delete(`/events`);
};
const findByTitle = title => {
    return http.get(`/events?title=${title}`);
};
const getRandomEventsByCount = count => {
    return http.get(`/events/getRandomEventsByCount?count=${count}`);
};
const EventService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
    getRandomEventsByCount
};
export default EventService;
