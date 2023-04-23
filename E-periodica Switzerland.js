{
	"translatorID": "dbfd99e3-6925-4b71-92b8-12b02aa875fc",
	"label": "E-periodica Switzerland",
	"creator": "Alain Borel",
	"target": "^https?://(www|news?)\\.e-periodica\\.ch",
	"minVersion": "5.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	"lastUpdated": "2023-08-15 20:15:50"
=======
	"lastUpdated": "2023-03-26 18:29:23"
>>>>>>> 734a75c7 (Single reference OK, multiple needs more work)
=======
	"lastUpdated": "2023-03-26 18:56:41"
>>>>>>> 16e05b42 (use scrape() for single refs as well)
=======
	"lastUpdated": "2023-03-27 18:54:23"
>>>>>>> 29ac84b4 (Rewritten scrape() to access JSON API => multiple working in some cases)
=======
	"lastUpdated": "2023-03-28 17:54:20"
>>>>>>> d417f84b (reliability OK for single refs, PDFs not always retrieved for multiple)
=======
	"lastUpdated": "2023-04-23 08:58:26"
>>>>>>> 1e7942dd (replace doGet() with requestText() as recommended)
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
function detectWeb(doc, url) {
	if (url.includes('/digbib/view')) {
		return "journalArticle";
	}
	else if (getSearchResults(doc, true)) {
		return "multiple";
	}
	else {
=======
=======
// just in case we need it at some point
>>>>>>> d417f84b (reliability OK for single refs, PDFs not always retrieved for multiple)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

=======
>>>>>>> d86bde37 (fix lint errors and warnings)
function detectWeb(doc, url) {
	// TODO: adjust the logic here
	if (url.includes('/digbib/view')) {
		return "journalArticle";
	}
	else if (url.includes('/digbib/dossearch?') && getSearchResults(doc, true)) {
		return "multiple";
<<<<<<< HEAD
	} else
	{
>>>>>>> 734a75c7 (Single reference OK, multiple needs more work)
=======
	}
	else {
>>>>>>> d86bde37 (fix lint errors and warnings)
		return false;
	}
}

function getSearchResults(doc, checkOnly) {
	var items = {};
<<<<<<< HEAD
	// Zotero.debug(items);
	var found = false;
	var rows = doc.querySelectorAll('h2.ep-result__title > a');
	for (let row of rows) {
		//Zotero.debug(row.textContent);
		let href = row.href;
		//Zotero.debug(href);
=======
	var found = false;
	var rows = doc.querySelectorAll('h2.ep-result__title > a');
	for (let row of rows) {
		Zotero.debug(row.innerHTML);
		// TODO: check and maybe adjust
		let href = row.href;
		Zotero.debug(href);
		// TODO: check and maybe adjust
>>>>>>> 734a75c7 (Single reference OK, multiple needs more work)
		let title = ZU.trimInternal(row.textContent);
		if (!href || !title) continue;
		if (checkOnly) return true;
		found = true;
		items[href] = title;
<<<<<<< HEAD
		// Zotero.debug(items[href]);
=======
>>>>>>> 734a75c7 (Single reference OK, multiple needs more work)
	}
	return found ? items : false;
}

async function doWeb(doc, url) {
<<<<<<< HEAD
	if (detectWeb(doc, url) == 'multiple') {
		let items = await Zotero.selectItems(getSearchResults(doc, false));
		if (!items) return;
		for (let resultUrl of Object.keys(items)) {
			await scrape(resultUrl);
		}
	}
	else {
		// The journalArticle type will be applicable in general unless we find multiple refs.
		await scrape(url);
	}
}

async function scrape(url) {
	// In general the article ID is given the pid parameter in the URL
	// If the URL ends with a hash/fragment identifier,
	//  the final digits of the pid parameter (after a double colon) must be replaced with the hash ID
	//  e.g. alp-001:1907:2::332#375 => alp-001:1907:2::375
	let articleURL = new URL(url);
	let articleID = articleURL.searchParams.get("pid");
	let articleViewFragment = articleURL.hash.replace(/^#/, ""); // trim leading #
	if (/\d+/.test(articleViewFragment)) {
		// Normalize article ID by replacing the last segment with the real
		// page id if any
		articleID = articleID.replace(/::\d+$/, "::" + articleViewFragment);
	}
	let pageinfoUrl = "https://www.e-periodica.ch/digbib/ajax/pageinfo?pid=" + encodeURIComponent(articleID);
	
	//Zotero.debug('JSON URL ' + pageinfoUrl);
	let epJSON = await requestJSON(pageinfoUrl);
	//Zotero.debug(epJSON);
	let risURL;
	if (epJSON.articles.length == 0) {
		// Fallback for non-article content, listed as Werbung, Sonstiges and various others:
		// this information is unfortunately not included in the JSON metadata => let's add a reasonable pseudo-title
		epJSON.articles = [{ title: "Untitled" }];
	}
	if (epJSON.articles["0"].hasRisLink) {
		risURL = '/view/' + epJSON.articles["0"].risLink;
	}
	
	// Zotero.debug(risURL);
	var pdfURL = null;
	if (epJSON.articles["0"].hasPdfLink) {
		pdfURL = epJSON.articles["0"].pdfLink;
	}
	// Zotero.debug(pdfURL);
	if (risURL) {
		let risText = await requestText(risURL);
		processRIS(risText, pdfURL);
	}
	else {
		var item = new Zotero.Item("journalArticle");
		item.title = epJSON.articles["0"].title.replace(' : ', ': ');
		item.publicationTitle = epJSON.journalTitle.replace(' : ', ': ');
		var numyear = epJSON.volumeNumYear.split(/[ ()]/).filter(element => element);
		if (numyear.length > 1) {
			item.date = numyear.slice(-1);
		}
		if (numyear.length > 0) {
			item.volume = numyear[0];
		}
		if (epJSON.issueNumber) {
			item.issue = epJSON.issueNumber;
		}
		if (epJSON.viewerLink.length > 0) {
			if (epJSON.viewerLink.indexOf("http") == 0) {
				item.url = epJSON.viewerLink;
			}
			else {
				item.url = "https://www.e-periodica.ch" + epJSON.viewerLink;
			}
		}
		if (epJSON.pdfLink) {
			if (epJSON.pdfLink.indexOf("http") == 0) {
				pdfURL = epJSON.pdfLink;
			}
			else {
				pdfURL = "https://www.e-periodica.ch" + epJSON.pdfLink;
			}
		}
		if (pdfURL) {
			item.attachments.push({
				url: pdfURL,
				title: "Full Text PDF",
				type: "application/pdf"
			});
		}
		item.complete();
	}
}

function processRIS(risText, pdfURL) {
=======
	if (detectWeb(doc, url) == 'journalArticle') {
		await scrape(doc, url);
	}

	// querySelectors in scrape() not working at this point for multiple. Is the DOM not complete yet?
	if (detectWeb(doc, url) == 'multiple') {
		Zotero.debug('doWeb on multiple refs.');
		Zotero.selectItems(getSearchResults(doc, false), function (items) {
			if (items) ZU.processDocuments(Object.keys(items), scrape);
		});
	}
	
	/*
	else {
		await scrape(doc, url);
	}
	*/
}

async function scrape(nextDoc, url) {
	var nextUrl = nextDoc.location.href;
	Zotero.debug('trying to process ' + nextUrl);
	// Do we really need to handle these #-containing URLs?
	nextUrl = nextUrl.replace("#", "%3A%3A").replace("::", "%3A%3A");
	nextUrl = nextUrl.split("%3A%3A");
	nextUrl = nextUrl[0] + "%3A%3A" + nextUrl.slice(-1);
	Zotero.debug('Final URL ' + nextUrl);
	var pageinfoUrl = nextUrl.replace("view", "ajax/pageinfo");
	Zotero.debug('JSON URL ' + pageinfoUrl);
	let text = await requestText(pageinfoUrl);
	var epJSON = JSON.parse(text);
	Zotero.debug(epJSON);
	var risURL = null;
	if (epJSON.articles["0"].hasRisLink) {
		risURL = '/view/' + epJSON.articles["0"].risLink;
	}
	
	Zotero.debug(risURL);
	var pdfURL = null;
	if (epJSON.articles["0"].hasPdfLink) {
		pdfURL = epJSON.articles["0"].pdfLink;
	}
	
	Zotero.debug(pdfURL);
	if (risURL) {
		let text = await requestText(risURL);
		processRIS(text, url, pdfURL);
	}
	else {
		var item = new Zotero.Item("journalArticle");
		item.title = epJSON.articles["0"].title;
		item.publicationTitle = epJSON.journalTitle;
		var numyear = epJSON.volumeNumYear.replace("(", "").replace(")", "").split(" ");
		if (numyear.length > 1) {
			item.date = numyear.slice(-1);
		}
		if (numyear.length > 0) {
			item.volume = numyear[0];
		}
		if (pdfURL) {
			Zotero.debug('PDF URL: ' + pdfURL);
			item.attachments.push({
				url: pdfURL,
				title: "E-periodica PDF",
				type: "application/pdf"
			});
		}
		item.complete();
	}
}

function convertCharRefs(string) {
	// converts hex decimal encoded html entities used by JSTOR to regular utf-8
	return string
		.replace(/&#x([A-Za-z0-9]+);/g, function (match, num) {
			return String.fromCharCode(parseInt(num, 16));
		});
}

function processRIS(text, URL, pdfURL) {
>>>>>>> 734a75c7 (Single reference OK, multiple needs more work)
	// load translator for RIS
	var translator = Zotero.loadTranslator("import");
	translator.setTranslator("32d59d2d-b65a-4da4-b0a3-bdd3cfb979e7");
	// Z.debug(text);
	
<<<<<<< HEAD
	translator.setString(risText);
	translator.setHandler("itemDone", function (obj, item) {
		// Don't save HTML snapshot from 'UR' tag
		item.attachments = [];
		
		// change colon spacing in title and publicationTitle
		item.title = item.title.replace(' : ', ': ');

		if (item.publicationTitle) {
			item.publicationTitle = item.publicationTitle.replace(' : ', ': ');
		}
		
=======
	// Reviews have a RI tag now (official RIS for Reviewed Item)
	var review = text.match(/^RI\s+-\s+(.+)/m);
	// sometimes we have subtitles stored in T1. These are part of the title, we want to add them later
	var subtitle = text.match(/^T1\s+-\s+(.+)/m);
	var maintitle = text.match(/^TI\s+-\s+(.+)/m);
	translator.setString(text);
	translator.setHandler("itemDone", function (obj, item) {
		// author names are not (always) supplied as lastName, firstName in RIS
		// we fix it here (note sure if still need with new RIS)
	
		var m;
		for (var i = 0, n = item.creators.length; i < n; i++) {
			if (!item.creators[i].firstName
				&& (m = item.creators[i].lastName.match(/^(.+)\s+(\S+)$/))) {
				item.creators[i].firstName = m[1];
				item.creators[i].lastName = m[2];
				delete item.creators[i].fieldMode;
			}
		}
		
		// fix special characters in abstract, convert html linebreaks and italics, remove stray p tags; don't think they use anything else
		if (item.abstractNote) {
			item.abstractNote = convertCharRefs(item.abstractNote);
			item.abstractNote = item.abstractNote.replace(/<\/p><p>/g, "\n").replace(/<em>(.+?)<\/em>/g, " <i>$1</i> ").replace(/<\/?p>/g, "");
			item.abstractNote = item.abstractNote.replace(/^\[/, "").replace(/\]$/, "");
		}
		// Don't save HTML snapshot from 'UR' tag
		item.attachments = [];
		// not currently using but that's where the PDF link is
		// var pdfurl = attr('a[data-qa="download-pdf"]', 'href');
		// Books don't have PDFs
		/*
		if (/stable\/([a-z0-9.]+)/.test(item.url) & item.itemType != "book") {
			let pdfurl = "/stable/pdfplus/" + jid + ".pdf?acceptTC=true";
			item.attachments.push({
				url: pdfurl,
				title: "JSTOR Full Text PDF",
				mimeType: "application/pdf"
			});
		}
		*/
		Zotero.debug('in processRIS');
		Zotero.debug(item);

		if (item.ISSN) {
			item.ISSN = ZU.cleanISSN(item.ISSN);
		}
		
		// Only the DOIs mentioned in RIS are valid, and we don't
		// add any other jid for DOI because they are only internal.
		
		if (maintitle && subtitle) {
			maintitle[1] = maintitle[1].replace(/:\s*$/, '');
			item.title = maintitle[1] + ": " + subtitle[1];
		}
		// reviews don't have titles in RIS - we get them from the item page
		if (!item.title && review) {
			var reviewedTitle = review[1];
			// A2 for reviews is actually the reviewed author
			var reviewedAuthors = [];
			for (i = 0; i < item.creators.length; i++) {
				if (item.creators[i].creatorType == "editor") {
					reviewedAuthors.push(item.creators[i].firstName + " " + item.creators[i].lastName);
					item.creators[i].creatorType = "reviewedAuthor";
				}
			}
			// remove any reviewed authors from the title
			for (i = 0; i < reviewedAuthors.length; i++) {
				reviewedTitle = reviewedTitle.replace(", " + reviewedAuthors[i], "");
			}
			item.title = "Review of " + reviewedTitle;
		}
		
		// titles may also contain escape characters
		item.title = convertCharRefs(item.title);
		
		// remove all caps from titles and authors.
		for (i = 0; i < item.creators.length; i++) {
			if (item.creators[i].lastName && item.creators[i].lastName == item.creators[i].lastName.toUpperCase()) {
				item.creators[i].lastName = ZU.capitalizeName(item.creators[i].lastName, true);
			}
			if (item.creators[i].firstName && item.creators[i].firstName == item.creators[i].firstName.toUpperCase()) {
				item.creators[i].firstName = ZU.capitalizeName(item.creators[i].firstName, true);
			}
		}
>>>>>>> 734a75c7 (Single reference OK, multiple needs more work)
		if (item.title == item.title.toUpperCase()) {
			item.title = ZU.capitalizeTitle(item.title.toLowerCase(), true);
		}

		// Retrieve fulltext
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		if (pdfURL !== null) {
			item.attachments.push({
				url: pdfURL,
				title: "Full Text PDF",
				type: "application/pdf"
			});
		}

		// DB in RIS maps to archive; we don't want that
		delete item.archive;
		
		item.complete();
	});

=======
		item.attachments.push({
			url : pdfURL,
			title : "E-periodica PDF",
			type : "application/pdf"
		});
		
=======
		if (pdfURL != null) {
=======
		if (pdfURL !== null) {
>>>>>>> d86bde37 (fix lint errors and warnings)
			item.attachments.push({
				url: pdfURL,
				title: "E-periodica PDF",
				type: "application/pdf"
			});
		}
>>>>>>> 29ac84b4 (Rewritten scrape() to access JSON API => multiple working in some cases)

		// DB in RIS maps to archive; we don't want that
		delete item.archive;
		if (item.DOI || /DOI: 10\./.test(item.extra)) {
			finalizeItem(item);
		}
		else {
			item.complete();
		}
	});

	function finalizeItem(item) {
	// Validate DOI
		let doi = item.DOI || item.extra.match(/DOI: (10\..+)/)[1];
		Zotero.debug("Validating DOI " + doi);
		// This just returns two lines of JSON
		ZU.doGet('https://doi.org/doiRA/' + encodeURIComponent(doi),
			function (text) {
			// Z.debug(text)
				try {
					var ra = JSON.parse(text);
					// Z.debug(ra[0].status)
					if (!ra[0] || ra[0].status == "DOI does not exist") {
						Z.debug("DOI " + doi + " does not exist");
						if (item.DOI) {
							delete item.DOI;
						}
						else {
							item.extra = item.extra.replace(/DOI: 10\..+\n?/, "");
						}
					}
				}
				catch (e) {
					if (item.DOI) {
						delete item.DOI;
					}
					else {
						item.extra.replace(/DOI: 10\..+\n?/, "");
					}
					Zotero.debug("Could not parse JSON. Probably invalid DOI");
				}
			}, function () {
				item.complete();
			});
	}

>>>>>>> 734a75c7 (Single reference OK, multiple needs more work)
	translator.getTranslatorObject(function (trans) {
		trans.doImport();
	});
}/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
<<<<<<< HEAD
<<<<<<< HEAD
		"url": "https://www.e-periodica.ch/digbib/view?pid=enh-006%3A2018%3A11::121#133",
		"detectedItemType": "journalArticle",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Untersuchungen zur aktuellen Verbreitung der schweizerischen Laufkäfer (Coleoptera: Carabidae): Zwischenbilanz",
				"creators": [
					{
						"lastName": "Hoess",
						"firstName": "René",
						"creatorType": "author"
					},
					{
						"lastName": "Chittaro",
						"firstName": "Yannick",
						"creatorType": "author"
					},
					{
						"lastName": "Walter",
						"firstName": "Thomas",
=======
		"url": "https://www.e-periodica.ch/digbib/view?pid=enh-006%3A2018%3A11#121",
		"defer": true,
=======
		"url": "https://www.e-periodica.ch/digbib/view?pid=enh-006%3A2018%3A11::121#133",
>>>>>>> 29ac84b4 (Rewritten scrape() to access JSON API => multiple working in some cases)
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Untersuchungen zur aktuellen Verbreitung der schweizerischen Laufkäfer (Coleoptera: Carabidae) : Zwischenbilanz",
				"creators": [
					{
<<<<<<< HEAD
						"lastName": "Wagner",
						"firstName": "André",
>>>>>>> 734a75c7 (Single reference OK, multiple needs more work)
=======
						"lastName": "Hoess",
						"firstName": "René",
						"creatorType": "author"
					},
					{
						"lastName": "Chittaro",
						"firstName": "Yannick",
						"creatorType": "author"
					},
					{
						"lastName": "Walter",
						"firstName": "Thomas",
>>>>>>> d417f84b (reliability OK for single refs, PDFs not always retrieved for multiple)
						"creatorType": "author"
					}
				],
				"date": "2018",
<<<<<<< HEAD
<<<<<<< HEAD
				"DOI": "10.5169/seals-986030",
				"ISSN": "1662-8500",
				"libraryCatalog": "E-periodica Switzerland",
				"pages": "129",
				"publicationTitle": "Entomo Helvetica: entomologische Zeitschrift der Schweiz",
				"shortTitle": "Untersuchungen zur aktuellen Verbreitung der schweizerischen Laufkäfer (Coleoptera",
				"volume": "11",
				"attachments": [
					{
						"title": "Full Text PDF",
						"type": "application/pdf"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.e-periodica.ch/digbib/view?pid=bts-004%3A2011%3A137%3A%3A254&referrer=search#251",
		"detectedItemType": "journalArticle",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Décentralisation, opportunités et contraintes",
				"creators": [
					{
						"lastName": "Fignolé",
						"firstName": "Jean-Claude",
						"creatorType": "author"
					}
				],
				"date": "2011",
				"DOI": "10.5169/seals-144646",
				"ISSN": "0251-0979",
				"issue": "05-06",
				"libraryCatalog": "E-periodica Switzerland",
				"pages": "14",
				"publicationTitle": "Tracés: bulletin technique de la Suisse romande",
				"volume": "137",
				"attachments": [
					{
						"title": "Full Text PDF",
						"type": "application/pdf"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.e-periodica.ch/digbib/view?pid=alp-001%3A1907%3A2%3A%3A332#375",
		"detectedItemType": "journalArticle",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Stimmen und Meinungen: schweizerisches Nationaldrama?",
				"creators": [
					{
						"lastName": "Falke",
						"firstName": "Konrad",
						"creatorType": "author"
					}
				],
				"date": "1907-1908",
				"DOI": "10.5169/seals-747870",
				"issue": "12",
				"libraryCatalog": "E-periodica Switzerland",
				"pages": "364",
				"publicationTitle": "Berner Rundschau: Halbmonatsschrift für Dichtung, Theater, Musik und bildende Kunst in der Schweiz",
				"shortTitle": "Stimmen und Meinungen",
				"volume": "2",
				"attachments": [
					{
						"title": "Full Text PDF",
						"type": "application/pdf"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.e-periodica.ch/digbib/view?pid=bts-004%3A2011%3A137%3A%3A262#262",
		"detectedItemType": "journalArticle",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Untitled",
				"creators": [],
				"date": "2011",
				"issue": "05-06",
				"libraryCatalog": "E-periodica Switzerland",
				"publicationTitle": "Tracés: bulletin technique de la Suisse romande",
				"url": "https://www.e-periodica.ch/digbib/view?pid=bts-004%3A2011%3A137%3A%3A262",
				"volume": "137",
				"attachments": [
					{
						"title": "Full Text PDF",
=======
				"DOI": "10.5169/seals-986029",
=======
				"DOI": "10.5169/seals-986030",
>>>>>>> d417f84b (reliability OK for single refs, PDFs not always retrieved for multiple)
				"ISSN": "1662-8500",
				"libraryCatalog": "E-periodica Switzerland",
				"pages": "129",
				"publicationTitle": "Entomo Helvetica : entomologische Zeitschrift der Schweiz",
				"shortTitle": "Untersuchungen zur aktuellen Verbreitung der schweizerischen Laufkäfer (Coleoptera",
				"volume": "11",
				"attachments": [
					{
						"title": "E-periodica PDF",
>>>>>>> 734a75c7 (Single reference OK, multiple needs more work)
						"type": "application/pdf"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.e-periodica.ch/digbib/view?pid=bts-004%3A2011%3A137%3A%3A254&referrer=search#251",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Décentralisation, opportunités et contraintes",
				"creators": [
					{
						"lastName": "Fignolé",
						"firstName": "Jean-Claude",
						"creatorType": "author"
					}
				],
				"date": "2011",
				"DOI": "10.5169/seals-144646",
				"ISSN": "0251-0979",
				"issue": "05-06",
				"libraryCatalog": "E-periodica Switzerland",
				"pages": "14",
				"publicationTitle": "Tracés : bulletin technique de la Suisse romande",
				"volume": "137",
				"attachments": [
					{
						"title": "E-periodica PDF",
						"type": "application/pdf"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.e-periodica.ch/digbib/view?pid=alp-001%3A1907%3A2%3A%3A332#375",
		"items": [
			{
				"itemType": "journalArticle",
				"title": "Stimmen und Meinungen : schweizerisches Nationaldrama?",
				"creators": [
					{
						"lastName": "Falke",
						"firstName": "Konrad",
						"creatorType": "author"
					}
				],
				"date": "1907-1908",
				"DOI": "10.5169/seals-747870",
				"issue": "12",
				"libraryCatalog": "E-periodica Switzerland",
				"pages": "364",
				"publicationTitle": "Berner Rundschau : Halbmonatsschrift für Dichtung, Theater, Musik und bildende Kunst in der Schweiz",
				"shortTitle": "Stimmen und Meinungen",
				"volume": "2",
				"attachments": [
					{
						"title": "E-periodica PDF",
						"type": "application/pdf"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
