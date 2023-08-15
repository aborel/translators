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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
	"lastUpdated": "2023-04-23 09:00:51"
>>>>>>> 67db6c3e (remove TODOs)
=======
	"lastUpdated": "2023-04-23 10:01:51"
>>>>>>> 5bac43e8 (colon spacing fix as recommended)
=======
	"lastUpdated": "2023-04-23 10:25:03"
>>>>>>> e551e3f4 (simplify processRIS())
=======
	"lastUpdated": "2023-04-27 15:19:03"
>>>>>>> 00c3234b (Fixed multiple results + some clean-up)
=======
	"lastUpdated": "2023-04-27 15:22:23"
>>>>>>> e0071020 (Fixed lint warning)
=======
	"lastUpdated": "2023-07-03 16:28:13"
>>>>>>> 20fd0c61 (remove unnecessary title check)
=======
	"lastUpdated": "2023-07-03 16:31:30"
>>>>>>> e9b74d56 (Commented out a few debug() calls)
=======
	"lastUpdated": "2023-07-03 16:38:30"
>>>>>>> 4bb7dffc (fix forgotten fulltext title instance)
=======
	"lastUpdated": "2023-07-03 16:50:16"
>>>>>>> ab9d5b6f (updated tests to match the new fulltext title)
=======
	"lastUpdated": "2023-07-03 16:54:43"
>>>>>>> ebff3038 (updated tests to match the new fulltext title)
=======
	"lastUpdated": "2023-07-03 17:08:53"
>>>>>>> 6ac7b212 (commented out JSON debug())
=======
	"lastUpdated": "2023-07-23 10:15:20"
>>>>>>> e14dbe13 (More useful handling of untitled content)
=======
	"lastUpdated": "2023-07-23 10:37:03"
>>>>>>> 2aed6374 (cleaner volume/year from fallback JSON)
=======
	"lastUpdated": "2023-08-15 20:15:50"
>>>>>>> cb4a7064 (multiple references in simple search mode)
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
	if (url.includes('/digbib/view')) {
		return "journalArticle";
	}
	else if (getSearchResults(doc, true)) {
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
<<<<<<< HEAD
	// Zotero.debug(items);
	var found = false;
	var rows = doc.querySelectorAll('h2.ep-result__title > a');
	for (let row of rows) {
		//Zotero.debug(row.textContent);
		let href = row.href;
		//Zotero.debug(href);
=======
=======
	Zotero.debug(items);
>>>>>>> cb4a7064 (multiple references in simple search mode)
	var found = false;
	var rows = doc.querySelectorAll('h2.ep-result__title > a');
	for (let row of rows) {
		//Zotero.debug(row.textContent);
		let href = row.href;
<<<<<<< HEAD
<<<<<<< HEAD
		Zotero.debug(href);
<<<<<<< HEAD
		// TODO: check and maybe adjust
>>>>>>> 734a75c7 (Single reference OK, multiple needs more work)
=======
>>>>>>> 67db6c3e (remove TODOs)
=======
		// Zotero.debug(href);
>>>>>>> e9b74d56 (Commented out a few debug() calls)
=======
		//Zotero.debug(href);
>>>>>>> cb4a7064 (multiple references in simple search mode)
		let title = ZU.trimInternal(row.textContent);
		if (!href || !title) continue;
		// sth goes wrong when we return from here
		if (checkOnly) return true;
		found = true;
		items[href] = title;
<<<<<<< HEAD
<<<<<<< HEAD
		// Zotero.debug(items[href]);
=======
>>>>>>> 734a75c7 (Single reference OK, multiple needs more work)
=======
		Zotero.debug(items[href]);
>>>>>>> cb4a7064 (multiple references in simple search mode)
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
		await scrape(url);
	}
	else if (detectWeb(doc, url) == 'multiple') {
		let items = await Zotero.selectItems(getSearchResults(doc, false));
		if (!items) return;
		for (let resultUrl of Object.keys(items)) {
			await scrape(resultUrl);
		}
	}
	else {
		// The fallback is not expected to be used on E-periodica, but just in case...
		await scrape(url);
	}
}

async function scrape(url) {
	var nextUrl = url;
	//Zotero.debug('trying to process ' + nextUrl);
	// Do we really need to handle these #-containing URLs?
	nextUrl = nextUrl.replace("#", "%3A%3A").replace("::", "%3A%3A");
	nextUrl = nextUrl.split("%3A%3A");
	nextUrl = nextUrl[0] + "%3A%3A" + nextUrl.slice(-1);
	//Zotero.debug('Final URL ' + nextUrl);
	var pageinfoUrl = nextUrl.replace("view", "ajax/pageinfo");
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

<<<<<<< HEAD
<<<<<<< HEAD
function processRIS(text, URL, pdfURL) {
>>>>>>> 734a75c7 (Single reference OK, multiple needs more work)
=======
function processRIS(risText, URL, pdfURL) {
>>>>>>> e2594a7f (avoid shadowing top-level name 'text')
=======
function processRIS(risText, pdfURL) {
>>>>>>> 22633914 (remove inconsistent url arguments in scrape() and processRIS())
	// load translator for RIS
	var translator = Zotero.loadTranslator("import");
	translator.setTranslator("32d59d2d-b65a-4da4-b0a3-bdd3cfb979e7");
	// Z.debug(text);
	
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> e551e3f4 (simplify processRIS())
	translator.setString(text);
=======
	translator.setString(risText);
>>>>>>> e2594a7f (avoid shadowing top-level name 'text')
	translator.setHandler("itemDone", function (obj, item) {
		// Don't save HTML snapshot from 'UR' tag
		item.attachments = [];
		
		// change colon spacing in title and publicationTitle
		item.title = item.title.replace(' : ', ': ');

		if (item.publicationTitle) {
			item.publicationTitle = item.publicationTitle.replace(' : ', ': ');
		}
		
<<<<<<< HEAD
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
=======
>>>>>>> e551e3f4 (simplify processRIS())
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
		
		item.complete();
	});

<<<<<<< HEAD
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
=======
>>>>>>> 00c3234b (Fixed multiple results + some clean-up)
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
<<<<<<< HEAD
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
<<<<<<< HEAD
=======
				"DOI": "10.5169/seals-986029",
=======
				"DOI": "10.5169/seals-986030",
>>>>>>> d417f84b (reliability OK for single refs, PDFs not always retrieved for multiple)
				"ISSN": "1662-8500",
				"libraryCatalog": "E-periodica Switzerland",
				"pages": "129",
				"publicationTitle": "Entomo Helvetica : entomologische Zeitschrift der Schweiz",
=======
>>>>>>> 5bac43e8 (colon spacing fix as recommended)
				"shortTitle": "Untersuchungen zur aktuellen Verbreitung der schweizerischen Laufkäfer (Coleoptera",
				"volume": "11",
				"attachments": [
					{
<<<<<<< HEAD
						"title": "E-periodica PDF",
>>>>>>> 734a75c7 (Single reference OK, multiple needs more work)
=======
						"title": "Full Text PDF",
>>>>>>> ebff3038 (updated tests to match the new fulltext title)
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
=======
>>>>>>> e14dbe13 (More useful handling of untitled content)
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
