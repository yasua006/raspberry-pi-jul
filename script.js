import * as js_things from "https://cdn.skypack.dev/js-things?min";
document.addEventListener("DOMContentLoaded", () => {
    class Countdowns {
        #christmas_month;
        #christmas_holiday_start_day;
        #christmas_eve_day;
        #main;
        #christmas_holiday_result;
        #christmas_eve_result;
        #countdown_result;
        #finished;
        #refresh_images_btn;
        constructor() {
            this.#christmas_month = 11; // starts from 0
            this.#christmas_holiday_start_day = 22;
            this.#christmas_eve_day = 24;
            this.#main = js_things.doc_qs('main');
            if (!this.#main) {
                js_things.show_err("No main element!", "fatal");
            }
            this.#christmas_holiday_result = this.#main.querySelector('section#countdowns span#christmas-holiday-result');
            this.#christmas_eve_result = this.#main.querySelector('section#countdowns span#christmas-eve-result');
            this.#countdown_result = this.#main.querySelector('section#countdowns span#countdown-result');
            this.#finished = this.#main.querySelector('section#countdowns span#finished');
            this.#handle_results();
            setInterval(() => {
                this.#handle_results();
            }, 1000);
            this.#rnd_christmas_images();
            this.#refresh_images_btn = this.#main.querySelector("section button#refresh-images-btn");
            if (!this.#refresh_images_btn) {
                js_things.show_err("No refresh images button!", "fatal");
            }
            this.#refresh_images_btn.addEventListener("click", () => {
                this.#rnd_christmas_images();
            }, { passive: true });
        }
        #result_helper(current_month, current_day, target_day, text_element) {
            if (!text_element) {
                js_things.show_err("No text element given!", "fatal");
            }
            let month_text = "måned";
            let day_text = "dag";
            if (current_month > this.#christmas_month) {
                text_element.textContent = "Ferdig!";
                return;
            }
            if (Number(this.#christmas_month - current_month) > 1) {
                month_text = `${this.#christmas_month - current_month} måneder og`;
            }
            else if (Number(this.#christmas_month - current_month) === 1) {
                month_text = `${this.#christmas_month - current_month} måned og`;
            }
            else {
                month_text = "";
            }
            if (target_day - current_day > 1) {
                day_text = `${target_day - current_day} dager igjen!`;
            }
            else if ((target_day - current_day) === 1) {
                day_text = `${target_day - current_day} dag igjen!`;
            }
            else {
                day_text = "";
            }
            text_element.textContent = `${month_text} ${day_text}`;
            if (this.#christmas_month - current_month === 0 && (target_day - current_day) === 0) {
                text_element.textContent = "I dag!";
            }
            else if (this.#christmas_month - current_month === 0 && (current_day >= target_day)) {
                text_element.textContent = "Ferdig!";
            }
            if (this.#christmas_month - current_month === 0 && (current_day >= this.#christmas_eve_day)) {
                this.#finished.textContent = "Ferdig for året!";
            }
        }
        #show_results(current_year, current_month, current_day, current_hours, current_minutes, current_seconds) {
            if ((!this.#christmas_holiday_result || !this.#christmas_eve_result) || !this.#countdown_result) {
                js_things.show_err("No christmas element!", "fatal");
            }
            // christmas holiday
            this.#result_helper(current_month, current_day, this.#christmas_holiday_start_day, this.#christmas_holiday_result);
            // christmas eve
            this.#result_helper(current_month, current_day, this.#christmas_eve_day, this.#christmas_eve_result);
            // countdown
            this.#countdown_result.textContent = `Dato: ${current_year}.${current_month + 1}.${current_day} Klokke: ${current_hours.toString().padStart(2, "0")}:${current_minutes.toString().padStart(2, "0")}:${current_seconds.toString().padStart(2, "0")}`;
        }
        #handle_results() {
            const new_date = new Date();
            const current_year = new_date.getFullYear();
            const current_month = new_date.getMonth();
            const current_day = new_date.getDate();
            const current_hours = new_date.getHours();
            const current_minutes = new_date.getMinutes();
            const current_seconds = new_date.getSeconds();
            this.#show_results(current_year, current_month, current_day, current_hours, current_minutes, current_seconds);
        }
        #rnd_christmas_images() {
            this.#main.querySelectorAll("section picture source, section picture img").forEach(elem => {
                const img_folder = "images";
                const image_count = 13;
                let number_choice = Math.round(Math.random() * image_count);
                if (number_choice > image_count) {
                    console.warn("Random higher than image count!");
                    return;
                }
                if (number_choice === 0) {
                    number_choice = Math.round(Math.random() * image_count);
                }
                if (elem instanceof HTMLSourceElement) {
                    elem.srcset = `${img_folder}/avif/${number_choice}_img.avif`;
                }
                if (elem instanceof HTMLImageElement) {
                    elem.src = `${img_folder}/${number_choice}_img.webp`;
                }
            });
        }
    }
    const np_text_helper = async (np_elem, np_text) => {
        if (!(np_elem instanceof Element) || !np_elem) {
            js_things.show_err("Invalid northpole forecast element!", "fatal");
        }
        if (!np_text) {
            js_things.show_err("Invalid northpole forecast text!", "fatal");
        }
        if (np_text.includes("_")) {
            console.warn("Unexpected northpole forecast id! Replacing underscores with hyphens...");
            np_text = np_text.replaceAll("_", "-");
        }
        const default_text = "N/A";
        np_elem.textContent = np_text ?? default_text;
    };
    const show_northpole_forecast = async () => {
        try {
            const res = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=90&lon=0&units=metric&lang=no&appid=280de22897de4654c3bdbc2838e18aea");
            if (!res.ok) {
                js_things.show_err(`Not OK! ${res.status}`, "fatal");
            }
            const data = await res.json();
            let weather_desc = data.weather[0].description;
            weather_desc = weather_desc.replaceAll("", "");
            const wind_speed_text = `${data.wind.speed} m/s`;
            const wind_deg_text = `${data.wind.deg} °`;
            const temp_text = `${data.main.temp} °C`;
            const feels_like_text = `${data.main.feels_like} °C`;
            const min_temp_text = `${data.main.temp_min} °C`;
            const max_temp_text = `${data.main.temp_max} °C`;
            ;
            const nf_elements = {};
            for (const nf_elem of js_things.doc_qs_all("main section#nf span")) {
                if (!nf_elem.id) {
                    js_things.show_err("No span id!", "fatal");
                }
                nf_elements[nf_elem.id] = nf_elem;
            }
            if (Object.keys(nf_elements).length === 0 || Object.values(nf_elements).length === 0) {
                js_things.show_err("No northpole elements!", "fatal");
            }
            const start_path = "nf-";
            await np_text_helper(nf_elements[`${start_path}desc`], weather_desc);
            await np_text_helper(nf_elements[`${start_path}wind-speed`], wind_speed_text);
            await np_text_helper(nf_elements[`${start_path}wind-deg`], wind_deg_text);
            await np_text_helper(nf_elements[`${start_path}wind-gust`], String(data.wind.gust));
            await np_text_helper(nf_elements[`${start_path}temp`], temp_text);
            await np_text_helper(nf_elements[`${start_path}feels-like`], feels_like_text);
            await np_text_helper(nf_elements[`${start_path}min-temp`], min_temp_text);
            await np_text_helper(nf_elements[`${start_path}max-temp`], max_temp_text);
            await np_text_helper(nf_elements[`${start_path}pressure`], data.main.pressure.toString());
            await np_text_helper(nf_elements[`${start_path}humidity`], data.main.humidity.toString());
            await np_text_helper(nf_elements[`${start_path}sea-lvl`], data.main.sea_level.toString());
            await np_text_helper(nf_elements[`${start_path}grnd-lvl`], data.main.grnd_level.toString());
        }
        catch (err) {
            js_things.show_err(`Cannot fetch the weather API: ${err}`, "fatal");
        }
    };
    show_northpole_forecast();
    js_things.animations_accessibility("abc");
    new Countdowns();
});
