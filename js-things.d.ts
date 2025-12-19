type Err_Lvl = "error" | "fatal";
type Style_Lvl = "internal" | CSSStyleSheet;
/** Create an HTML element with optional parent, ID, and class
 * @param {keyof HTMLElementTagNameMap | string} tag_name
 * @param {HTMLElement} elem_par - The element's parent
 * @param {string | undefined} [elem_id] - Optional: the element's id
 * @param {string | undefined} [elem_class] - Optional: element class
 * @returns {HTMLElement}
 * @throws {Error} - If provided tag name is invalid
 * @throws {Error} - If provided element parent is invalid
 * @example const main_header = js_things.create_elem(
    "header", // element tag name
    document.body, // element parent
    "main-header", // optional: element id
    "header-styles" // optional: element class
);
 */
export declare const create_elem: (tag_name: keyof HTMLElementTagNameMap, elem_par: HTMLElement, elem_id?: string | undefined, elem_class?: string | undefined) => HTMLElement;
/** Intended for logging only. No side effects beyond console output
 * @returns {void}
 */
export declare const debug_info: () => void;
/** Shortened version of query selector using the Document
 * @param {keyof HTMLElementTagNameMap | string} selectors
 * @returns {Element | HTMLElement | null}
 * @see Document: querySelector() method: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 */
export declare const doc_qs: (selectors: keyof HTMLElementTagNameMap | string) => Element | null;
/** Shortened version of query selector ALL using the Document
 * @param {keyof HTMLElementTagNameMap | string} selectors
 * @returns {NodeListOf<Element | HTMLElement>}
 * @see Document: querySelectorAll() method: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 */
export declare const doc_qs_all: (selectors: keyof HTMLElementTagNameMap | string) => NodeListOf<Element>;
/** Show an error message in the console
 * @param {string} err_msg
 * @param {Err_Lvl} err_lvl - A string choice
 * @returns {void}
 * @throws {Error} - If provided error message is invalid
 * @throws {Error} - If provided error level is invalid
 * @typedef {"error" | "fatal"} Err_Lvl
 */
export declare const show_err: (err_msg: string, err_lvl: Err_Lvl) => void;
/** Wait asynchronously with an optional abort signal
 * @param {number} time_in_ms
 * @param {AbortSignal | undefined} [abort]
 * @returns {Promise<any>}
 * @example await js_things.wait(
    3000
    new AbortController().signal
);
 */
export declare const wait: (time_in_ms: number, abort?: AbortSignal | undefined) => Promise<void>;
/** Handles accessibility for animations disabled on browsers
 * @param {string} css_selectors
 * @param {Style_Lvl | undefined} [style_lvl] - Optional: A choice between internal styles, or an external stylesheet. Defaults to internal styles, all animations.
 * @returns {void}
 * @throws {Error} - If provided CSS selectors are invalid or empty
 * @typedef {"internal" | CSSStyleSheet} Style_Lvl
 * @example js_things.animations_accessibility("body, body *", "internal");
 */
export declare const animations_accessibility: (css_selectors: string, style_lvl?: Style_Lvl | undefined) => void;
/** Handles accessibility by handling the id, intended for a section or a div behaving like a section
 * @param {HTMLElement} section
 * @param {HTMLHeadingElement} heading - A child of the same section, which describes the section
 * @returns {void}
 * @throws {Error} - If provided section or heading is invalid
 * @example js_things.section_accessibility(section, heading_two);
 */
export declare const section_accessibility: (section: HTMLElement, heading: HTMLHeadingElement) => void;
export {};
