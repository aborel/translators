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
	"lastUpdated": "2024-02-04 12:07:12"
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
	if (url.includes("www.ijllr.com/volume")) {
		return "multiple";
	}
	else if (url.includes("www.ijllr.com/post")) {
		return "journalArticle";
	}
	return false;
}


function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	// TODO adapt selector, some layers of spans might be required
	var rows = doc.querySelectorAll('a.wixui-rich-text__text');
	for (let row of rows) {
		let href = row.href;
		let title = ZU.trimInternal(row.textContent);
		if (!href || !title) continue;
		if ((title.indexOf('http') != 0) && (href.includes('www.ijllr.com/post/'))) {
			found = true;
			items[href] = title;
		}
		if (checkOnly) return true;
	}
	Zotero.debug(items);
	return found ? items : false;
}


async function doWeb(doc, url) {
	if (detectWeb(doc, url) == 'journalArticle') {
		await scrape(doc);
	}
	else if (detectWeb(doc, url) == 'multiple') {
		let items = await Zotero.selectItems(getSearchResults(doc, false));
		if (!items) return;
		for (let itemUrl of Object.keys(items)) {
			await scrape(await requestDocument(itemUrl));
		}
	}
	else {
		// The fallback is not expected to be used on IJLLR, but just in case...
		await scrape(doc);
	}
}


async function scrape(nextDoc) {
	var item = new Zotero.Item("journalArticle");
	//let title = nextDoc.querySelectorAll('h1 > span.post-title__text > span.blog-post-title-font');
	let title = nextDoc.querySelectorAll('h1.post-title');
	Zotero.debug(title[0].textContent);
	if (title) {
		item.title = title[0].textContent;
	}
	item.ISSN = '2582-8878';
	item.publicationTitle = 'Indian Journal of Law and Legal Research';
	item.url = nextDoc.location.href;
	item.creators = [];
	let possibleAuthorLines = nextDoc.querySelectorAll('span.UYHF3 > span');
	Zotero.debug(possibleAuthorLines.length);
	for (let line of possibleAuthorLines) {
		// lines with an author name, titles, affiliation, embed each token inside a <span> tag (including spaces and punctuation...)
		Zotero.debug(line.textContent);
		let tokens = Array.from(line.querySelectorAll('span'));
		if (tokens.length) {
			Zotero.debug(line.textContent);
			let author = { creatorType: "author" };
			let fullName = line.textContent.split(',')[0];
			author.lastName = fullName.split(' ').slice(-1)[0];
			// TODO join Array elements with a space
			author.firstName = fullName.slice(0, fullName.indexOf(author.lastName)).toString();
			Zotero.debug(author);
			item.creators.push(author);
		}
	}
	// TODO try some other articles, 2nd attribute doesn't inspire confidence
	let mainBlock = nextDoc.querySelectorAll('div[type="paragraph"][data-hook="rcv-block7"]')[0].parentNode;


	item.abstractNote = "";
	for (let strong of nextDoc.querySelectorAll('strong')) {
		Zotero.debug([strong.innerText]);
		if (strong.innerText.indexOf('ABSTRACT') == 0) {
			let abstractTitleNode = strong.parentNode.parentNode.parentNode;
			Zotero.debug(abstractTitleNode.innerHTML);
			let abstractNode = abstractTitleNode.nextSibling;
			let k = 0;
			while (!abstractNode.textContent.includes('Keywords:') && k < 10) {
				Zotero.debug(abstractNode.textContent);
				if (abstractNode.textContent.length) {
					if (item.abstractNote) {
						item.abstractNote += '\n';
					}
					item.abstractNote += abstractNode.textContent;
				}
				abstractNode = abstractNode.nextSibling;
				k += 1;
			}
			Zotero.debug('Out of while() loop');
			Zotero.debug(abstractNode.textContent);
			Zotero.debug(abstractNode.textContent.indexOf('Keywords:'));
			if (abstractNode.textContent.trim().indexOf('Keywords:') == 0) {
				Zotero.debug('processing keywords line');
				Zotero.debug(abstractNode.textContent.replace('Keywords:', ''));
				item.tags = abstractNode.textContent.replace('Keywords:', '').trim().split(', ');
			}
		}
	}

	let volumeLine = nextDoc.querySelectorAll('a.post-categories-list__link');
	item.volume = volumeLine[0].textContent.match(/Volume ([^ ]+)/)[1];
	item.issue = volumeLine[0].textContent.match(/Issue (.*)$/)[1];

	// page numbers and publication year are available in the table of contents of each issue
	let issueUrl = 'https://www.ijllr.com/volume-' + item.volume.toLowerCase() + '-issue-' + item.issue.toLowerCase();
	Zotero.debug(issueUrl);
	await requestDocument(issueUrl).then((issuePage) => {
		Zotero.debug('hello!');
		// Really a problem when trying to use the response...
		// Zotero.debug(issuePage);
		// let articleFrames = issuePage.querySelectorAll('div[data-testid="mesh-container-content]');
		// Zotero.debug(articleFrames.length);
	});

	// This apparently times out
	// Zotero.debug(issuePage);
	// let articleFrames = issuePage.querySelectorAll('div[data-testid="mesh-container-content]');
	// Zotero.debug(articleFrames);
	//


	// TODO continue with issueUrl + '-page2' and so on until we get a 404?

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
				"abstractNote": "The paper starts with the meaning of legal positivism and also explains the philosophies put forward by the different philosophers of school of legal positivism. It also connects how law in today can be related to legal positivism by using hart theory of law. The paper also looks at the aspects German Juristic School with a focus on the Grundnorm, or popularized as the basic norm. Kelsen makes the assumption that there must be a guarantee of unity for the scientific depiction of a positive-legal order, which is a hierarchy of legal propositions. This guarantee must be a part of the representation in order to be considered a legal entity. It counts as a representation of an actual standard because it is a legal statement. As a result, Kelsen elliptically refers to it as a \"basic norm (Grundnorm)\". \n\nFollowing that, the ideals of German Juristic School have also been recognized as we have delved deep into the same. Kelsen was hailed as \"undoubtedly the leading jurist of the time\" by Roscoe Pound in 1934. While in Vienna, Kelsen interacted with Sigmund Freud and his friends wrote about sociology and social psychology. \n\nTherefore, it can be concluded that the positivist school is an amalgamation of the English and German thinkers and their ideas. Their drive has caused the Realist school to flourish throughout the legal world and understand law from the most pragmatic perspective.",
				"issue": "III",
				"libraryCatalog": "Indian Journal of Law and Legal Research",
				"publicationTitle": "Indian Journal of Law and Legal Research",
				"url": "https://www.ijllr.com/post/english-and-german-schools-of-legal-positivism",
				"volume": "V",
				"attachments": [],
				"tags": [
					{
						"tag": "Jurisprudence."
					},
					{
						"tag": "Law"
					},
					{
						"tag": "Positivism"
					},
					{
						"tag": "School"
					}
				],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
