import React from "react"
import Cookies from "universal-cookie";
import './Header.css'

export default function Header() {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN")
    const logout = () => {
        // destroy the cookie
        cookies.remove("TOKEN", { path: "/" });
        // redirect user to the landing page
        window.location.href = "/";
    }
    return (<div>

        <h1>Bidding Process for Autumn Semester - SOM 26</h1>
        <input class="menu-icon" type="checkbox" id="menu-icon" name="menu-icon" />
        <label for="menu-icon"></label>
        <nav class="nav">
            <ul class="pt-5">
                <li><a href="https://docs.google.com/presentation/d/1GZ5BNpHBdVVXLm2KEqDlx9TKxIme12WJHdVywfoO-eE/edit?usp=sharing" target="_blank">Rules</a></li>
                <li><a href="https://docs.google.com/spreadsheets/d/1UQlrn0pL_37SjQ2scE4z7WhE7ZkDfGzz-c8x7qZUyeY/edit?usp=sharing" target="_blank">Subject Plan</a></li>
                <li><a href="https://drive.google.com/drive/folders/1AoiCG0smQWVMx_E-JlokEju3tYJjJI2D?usp=drive_link" target="_blank">Time Table</a></li>
                {token && <li> <button class='button-89' id='buttonLogout' type="submit" variant="danger" onClick={() => logout()}>
                    Logout
                </button></li>}
            </ul>
        </nav>

        {/* <div class="section-center">
            <h1 class="mb-0">Bidding Process for Autumn Semester - SOM 24</h1>
        </div> */}
    </div>)
}


