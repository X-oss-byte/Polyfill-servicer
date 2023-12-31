import {ConfigStore} from 'fastly:config-store';
import {ObjectStore} from 'fastly:object-store';
import { shouldLog } from "../../../logger";
import { features } from "./features.js";

/**
 * Get the metadata for a specific polyfill within the collection of polyfill sources.
 * @param {String} featureName - The name of a polyfill whose metadata should be returned.
 * @returns {Promise<Object|undefined>} A promise which resolves with the metadata or with `undefined` if no metadata exists for the polyfill.
 */

let config;
export async function getPolyfillMeta(store, featureName) {
	if (!featureName) { return undefined;}
	if (!config) {
		let n = store.replace(/(-|\.)/g, '_');
		config = new ConfigStore(n);
	}
	let meta = await config.get(featureName)
	if (!meta) {
		if (shouldLog()) {
			console.log('store: ', store, 'missing: ', featureName)
		}
		return undefined;
	}
	let b = JSON.parse(meta);
	return b;
}

/**
 * Get a list of all the polyfills which exist within the collection of polyfill sources.
 * @returns {Promise<Array>} A promise which resolves with an array of all the polyfills within the collection.
 */
export function listPolyfills() {
	return features;
}

let aliases;
/**
 * Get the polyfills that are under the same alias.
 * @param {string} alias - The name of an alias whose metadata should be returned.
 * @returns {Promise<Object|undefined>} A promise which resolves with the metadata or with `undefined` if no alias with that name exists.
 */
export async function getConfigAliases(store, alias) {
	if (!alias) { return undefined;}
	if (!aliases) {
		let n = store.replace(/(-|\.)/g, '_');
		aliases = new ConfigStore(n + '_aliases');
	}
	let a = aliases.get(alias);
	let b =  a ? JSON.parse(a) : undefined;
	return b;
}

const encoder = new TextEncoder()
function stringToReadableStream(value) {
	return new ReadableStream({
		start(controller) {
			controller.enqueue(encoder.encode(value));
			controller.close();
		},
	});
}

/**
 * Get the aliases for a specific polyfill.
 * @param {string} featureName - The name of a polyfill whose implementation should be returned.
 * @param {'min'|'raw'} type - Which implementation should be returned: minified or raw implementation.
 * @returns {string} A ReadStream instance of the polyfill implementation as a utf-8 string.
*/
let polyfills;
export async function streamPolyfillSource(store, featureName, type) {
	// const now = Date.now();
	if (!config) {
		let n = store.replace(/(-|\.)/g, '_');
		config = new ConfigStore(n);
	}
	let c =  config.get(featureName+'/'+ type + ".js")
	if (c) {
		// console.log('streamPolyfillSource', env("FASTLY_POP"),  'config-store', 'took', Date.now() - now, store, featureName, type);
		return stringToReadableStream(c);
	}
	if (!polyfills) {
		polyfills = new ObjectStore(store);
	}
	let polyfill = await polyfills.get('/'+featureName+'/'+ type + ".js");
	if (!polyfill) {
		const ttype = type === 'raw' ? 'min' : 'raw';
		polyfill = await polyfills.get('/'+featureName+'/'+ ttype + ".js");
		if (!polyfill) {
			if (shouldLog()) {
				console.log('store: ', store, 'missing: ', '/'+featureName+'/'+ type + ".js")
			}
		}
	}
	let b = polyfill.body;
	// console.log('streamPolyfillSource', env("FASTLY_POP"),  'object-store', 'took', Date.now() - now, store, featureName, type);
	return b;
}
