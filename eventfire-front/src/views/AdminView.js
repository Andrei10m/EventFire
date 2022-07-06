/*
import React, {useEffect, useState} from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddEvents from "./views/AddEvents";
import Event from "./common/Event";
import ListEvents from "./views/ListEvents";
import EventBus from "../common/EventBus";
import UserService from "../service/UserService";

const AdminView = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/events" className="navbar-brand">
                    EventFire
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/events"} className="nav-link">
                            Events
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                </div>
            </nav>
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<ListEvents/>} />
                    <Route path="/tutorials" element={<ListEvents/>} />
                    <Route path="/add" element={<AddEvents/>} />
                    <Route path="/tutorials/:id" element={<Event/>} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminView;*/
