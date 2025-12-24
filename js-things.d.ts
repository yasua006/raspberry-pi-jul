type Debug_Option = "is_browser" | "default";
type Err_Lvl = "error" | "fatal";
type Msg_Lvl = "log" | "info" | "warn";
type Msg_Choice = {
    value: Msg_Lvl;
};
type Style_Lvl = "internal" | CSSStyleSheet | "default";
/** Create an HTML element with optional parent, ID, and class
 *
 * @param {keyof HTMLElementTagNameMap} tag_name - A string choice of HTML elements
 * @param {HTMLElement} elem_par - The element's parent
 * @param {string | undefined} [elem_id] - Optional: the element's id
 * @param {string | undefined} [elem_class] - Optional: element class
 * @returns {HTMLElement}
 * @throws If provided tag name is invalid
 * @throws If provided element parent is invalid
 * @example const main_header = js_things.create_elem(
    "header", // element tag name
    document.body, // element parent
    "main-header", // optional: element id
    "header-styles" // optional: element class
);
 */
export declare const create_elem: (tag_name: keyof HTMLElementTagNameMap, elem_par: HTMLElement, elem_id?: string | undefined, elem_class?: string | undefined) => HTMLElement;
/** Intended for logging only. No side effects beyond console output
 *
 * @param {Debug_Option | undefined} [debug_option]
 * @typedef {"is_browser" | "default"} Debug_Option
 * @returns {void}
 */
export declare const debug_info: (debug_option?: Debug_Option | undefined) => void;
/** Shortened version of query selector using the Document
 *
 * @param {keyof HTMLElementTagNameMap | string} selectors
 * @returns {HTMLElement | null}
 * @see Document: querySelector() method: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 */
export declare const doc_qs: (selectors: keyof HTMLElementTagNameMap | string) => HTMLElement | null;
/** Shortened version of query selector ALL using the Document
 *
 * @param {keyof HTMLElementTagNameMap | string} selectors
 * @returns {NodeListOf<Element>}
 * @see Document: querySelectorAll() method: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 */
export declare const doc_qs_all: (selectors: keyof HTMLElementTagNameMap | string) => NodeListOf<Element>;
/** Show an error message in the console
 *
 * @param {string} err_msg
 * @param {Err_Lvl} err_lvl - A string choice of error or fatal
 * @returns {void}
 * @throws If provided error message is invalid
 * @throws If provided error level is invalid
 * @typedef {"error" | "fatal"} Err_Lvl
 * @example js_things.show_err("Example!", "error");
 */
export declare const show_err: (err_msg: string, err_lvl: Err_Lvl) => void;
/** Show a message in the console
 *
 * @param {Msg_Choice} msg_choice - A value choice of log, info, or warn
 * @param {string} msg
 * @returns {void}
 * @throws If provided message is invalid
 * @typedef {"log" | "info" | "warn"} Msg_Lvl
 * @typedef {{ value: Msg_Lvl }} Msg_Choice
 * @example js_things.show_msg({ value: "info" }, "Information");
 */
export declare const show_msg: (msg_choice: Msg_Choice, msg: string) => void;
/** Wait asynchronously with an optional abort signal
 *
 * @param {number} time_in_ms
 * @param {AbortSignal | undefined} [abort]
 * @returns {Promise<void>}
 * @example await js_things.wait(
    3000
    new AbortController().signal
);
 */
export declare const wait: (time_in_ms: number, abort?: AbortSignal | undefined) => Promise<void>;
/** Handles accessibility for animations disabled on browsers
 *
 * @param {string} css_selectors
 * @param {Style_Lvl | undefined} [style_lvl] - Optional: internal styles, an external stylesheet, or default. Defaults to internal styles, all animations.
 * @returns {void}
 * @throws provided CSS selectors are invalid or empty
 * @typedef {"internal" | CSSStyleSheet | "default"} Style_Lvl
 * @example js_things.animations_accessibility("body, body *", "internal");
 */
export declare const animations_accessibility: (css_selectors: string, style_lvl?: Style_Lvl | undefined) => void;
/** Handles functionality and accessibility for elements behaving like a button
 *
 * @param {HTMLElement} btn
 * @returns {void}
 * @throws If provided button is invalid
 * @throws If provided button is already a button tag
 * @throws If the button's text is empty
 * @example const old_btn = js_things.create_elem("div", document.body, "old-btn");
old_btn.textContent = "Accessible";
 */
export declare const btn_accessibility: (btn: HTMLElement) => void;
/** Handles accessibility by handling the id, intended for both a section or a div behaving like a section
 *
 * @param {HTMLElement} section - The section or div element with a heading
 * @param {HTMLHeadingElement} heading - A child of the section or div element, which describes it
 * @returns {void}
 * @throws If any provided parameter is invalid
 * @example js_things.section_accessibility(section, heading_two);
 */
export declare const section_accessibility: (section: HTMLElement, heading: HTMLHeadingElement) => void;
export {};
