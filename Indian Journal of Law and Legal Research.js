{
	"translatorID": "abca0ea9-1434-48ea-a04f-0d926973686b",
	"label": "Indian Journal of Law and Legal Research",
	"creator": "Alain Borel",
	"target": "^https?://www\\.ijllr\\.com",
	"minVersion": "5.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2023-08-01 05:34:46"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2023 Alain Borel

	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/

// single ref example  https://www.ijllr.com/post/pocso-act-a-critical-analysis
// multiple ref example https://www.ijllr.com/volume-v-issue-iii

function detectWeb(doc, url) {
	if (url.includes("volume")) {
		return "multiple";
	}
	else if (url.includes("post")) {
		return "journalArticle";
	}
	return false;
}


function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	// TODO adapt selector, some layers of spans might be required
	var rows = doc.querySelectorAll('h4 > span');
	for (let row of rows) {
		// Zotero.debug(row.innerHTML);
		let href = row.href;
		// Zotero.debug(href);
		let title = ZU.trimInternal(row.textContent);
		if (!href || !title) continue;
		if (checkOnly) return true;
		found = true;
		items[href] = title;
	}
	return found ? items : false;
}


async function doWeb(doc, url) {
	if (detectWeb(doc, url) == 'journalArticle') {
		await scrape(doc, url);
	}
	else if (detectWeb(doc, url) == 'multiple') {
		let items = await Zotero.selectItems(getSearchResults(doc, false));
		if (!items) return;
		for (let url of Object.keys(items)) {
			await scrape(await requestDocument(url));
		}
	}
	else {
		// The fallback is not expected to be used on IJLLR, but just in case...
		await scrape(doc, url);
	}
}


async function scrape(nextDoc, url) {

}

/** BEGIN TEST CASES **/
var testCases = [
]
/** END TEST CASES **/
