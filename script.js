import * as js_things from "https://cdn.skypack.dev/js-things?min";
document.addEventListener("DOMContentLoaded", () => {
    class Countdown {
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
            if (current_month < this.#christmas_month) {
                text_element.textContent = "Kommer senere!";
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
    const show_northpole_forecast = async () => {
        try {
            const res = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=90&lon=0&units=metric&lang=no&appid=280de22897de4654c3bdbc2838e18aea");
            if (!res.ok) {
                js_things.show_err(`Not OK! ${res.status}`, "fatal");
            }
            const data = await res.json();
            ;
            const northpole_forecast_elements = {
                northpole_forecast_desc: document.querySelector('#northpole-forecast-description'),
                northpole_forecast_wind_speed: document.querySelector('#northpole-forecast-wind-speed'),
                northpole_forecast_wind_deg: document.querySelector('#northpole-forecast-wind-deg'),
                northpole_forecast_wind_gust: document.querySelector('#northpole-forecast-wind-gust'),
                northpole_forecast_temp: document.querySelector('#northpole-forecast-temp'),
                northpole_forecast_feels_like: document.querySelector('#northpole-forecast-feels-like'),
                northpole_forecast_min_temp: document.querySelector('#northpole-forecast-min-temp'),
                northpole_forecast_max_temp: document.querySelector('#northpole-forecast-max-temp'),
                northpole_forecast_pressure: document.querySelector('#northpole-forecast-pressure'),
                northpole_forecast_humidity: document.querySelector('#northpole-forecast-humidity'),
                northpole_forecast_sea_level: document.querySelector('#northpole-forecast-sea-lvl'),
                northpole_forecast_grnd_level: document.querySelector('#northpole-forecast-grnd-lvl')
            };
            if ((!northpole_forecast_elements.northpole_forecast_desc || !northpole_forecast_elements.northpole_forecast_wind_speed) || (!northpole_forecast_elements.northpole_forecast_wind_deg || !northpole_forecast_elements.northpole_forecast_wind_gust) || (!northpole_forecast_elements.northpole_forecast_temp || !northpole_forecast_elements.northpole_forecast_feels_like) || (!northpole_forecast_elements.northpole_forecast_min_temp || !northpole_forecast_elements.northpole_forecast_max_temp) || (!northpole_forecast_elements.northpole_forecast_pressure || !northpole_forecast_elements.northpole_forecast_humidity) || (!northpole_forecast_elements.northpole_forecast_sea_level || !northpole_forecast_elements.northpole_forecast_grnd_level)) {
                js_things.show_err("No elements for northpole weather!", "fatal");
            }
            let weather_desc = data.weather[0].description;
            weather_desc = weather_desc.replace(/"/g, "");
            const get_wind_speed = data.wind.speed;
            const get_wind_deg = data.wind.deg;
            const get_temp = data.main.temp;
            const get_feels_like = data.main.feels_like;
            const get_min_temp = data.main.temp_min;
            const get_max_temp = data.main.temp_max;
            const wind_speed_text = `${get_wind_speed} m/s`;
            const wind_deg_text = `${get_wind_deg} °`;
            const temp_text = `${get_temp} °C`;
            const feels_like_text = `${get_feels_like} °C`;
            const min_temp_text = `${get_min_temp} °C`;
            const max_temp_text = `${get_max_temp} °C`;
            northpole_forecast_elements.northpole_forecast_desc.textContent = weather_desc ?? "N/A";
            northpole_forecast_elements.northpole_forecast_wind_speed.textContent = wind_speed_text ?? "N/A m/s";
            northpole_forecast_elements.northpole_forecast_wind_deg.textContent = wind_deg_text ?? "N/A °";
            northpole_forecast_elements.northpole_forecast_wind_gust.textContent = data.wind.gust ?? "N/A";
            northpole_forecast_elements.northpole_forecast_temp.textContent = temp_text ?? "N/A °C";
            northpole_forecast_elements.northpole_forecast_feels_like.textContent = feels_like_text ?? "N/A °C";
            northpole_forecast_elements.northpole_forecast_min_temp.textContent = min_temp_text ?? "N/A °C";
            northpole_forecast_elements.northpole_forecast_max_temp.textContent = max_temp_text ?? "N/A °C";
            northpole_forecast_elements.northpole_forecast_pressure.textContent = data.main.pressure ?? "N/A";
            northpole_forecast_elements.northpole_forecast_humidity.textContent = data.main.humidity ?? "N/A";
            northpole_forecast_elements.northpole_forecast_sea_level.textContent = data.main.sea_level ?? "N/A";
            northpole_forecast_elements.northpole_forecast_grnd_level.textContent = data.main.grnd_level ?? "N/A";
        }
        catch (err) {
            js_things.show_err(`Cannot fetch the weather API: ${err}`, "fatal");
        }
    };
    show_northpole_forecast();
    js_things.animations_accessibility("body, body *", "internal");
    new Countdown();
});
