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
	"lastUpdated": "2023-08-11 03:53:38"
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
	var item = new Zotero.Item("journalArticle");
	//let title = nextDoc.querySelectorAll('h1 > span.post-title__text > span.blog-post-title-font');
	let title = nextDoc.querySelectorAll('h1.post-title');
	Zotero.debug(title[0].textContent);
	if (title) {
		item.title = title[0].textContent;
	}
	item.ISSN = '2582-8878';
	item.publicationTitle = 'Indian Journal of Law and Legal Research';
	item.url = url;
	item.creators = [];
	let possibleAuthorLines = nextDoc.querySelectorAll('p.public-DraftStyleDefault-block-depth0 > span.public-DraftStyleDefault-ltr > span');
	for (let line of possibleAuthorLines) {
		// lines with an author name, titles, affiliation, embed each token inside an <em> tag (including spaces and punctuation...)
		let tokens = Array.from(line.querySelectorAll('em'));
		if (tokens.length) {
			Zotero.debug(line.textContent);
			let author = {"creatorType": "author"};
			let fullName = line.textContent.split(',')[0];
			author.lastName = fullName.split(' ').slice(-1);
			author.firstName = fullName.slice(0, fullName.indexOf(author.lastName));
			Zotero.debug(author);
			item.creators.push(author);
		}
	}
	// TODO try some other articles, 2nd attribute doesn't inspire confidence
	let mainBlock = nextDoc.querySelectorAll('div[type="paragraph"][data-hook="rcv-block7"]');
	Zotero.debug('mainBlock(s):' + mainBlock.length.toString());

	let volumeLine = nextDoc.querySelectorAll('a.post-categories-list__link');
	Zotero.debug(volumeLine.length);
	Zotero.debug(volumeLine[0].textContent);
	item.volume = volumeLine[0].textContent.match(/Volume ([^ ]+)/)[1];
	Zotero.debug(item.volume);
	item.issue = volumeLine[0].textContent.match(/Issue (.*)$/)[1];

	item.complete();

}

/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://www.ijllr.com/post/pocso-act-a-critical-analysis",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Pocso Act: A Critical Analysis",
				"creators": [
					{
						"creatorType": "author",
						"lastName": [
							"Gahlot"
						],
						"firstName": "Yashashvi "
					}
				],
				"ISSN": "2582-8878",
				"issue": "III",
				"libraryCatalog": "Indian Journal of Law and Legal Research",
				"publicationTitle": "Indian Journal of Law and Legal Research",
				"shortTitle": "Pocso Act",
				"url": "https://www.ijllr.com/post/pocso-act-a-critical-analysis",
				"volume": "V",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.ijllr.com/post/english-and-german-schools-of-legal-positivism",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "English And German Schools Of Legal Positivism",
				"creators": [
					{
						"creatorType": "author",
						"lastName": [
							"Mathur"
						],
						"firstName": "Rakshita "
					},
					{
						"creatorType": "author",
						"lastName": [
							"Verma"
						],
						"firstName": "Shivam "
					}
				],
				"ISSN": "2582-8878",
				"issue": "III",
				"libraryCatalog": "Indian Journal of Law and Legal Research",
				"publicationTitle": "Indian Journal of Law and Legal Research",
				"url": "https://www.ijllr.com/post/english-and-german-schools-of-legal-positivism",
				"volume": "V",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
