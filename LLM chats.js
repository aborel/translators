{
	"translatorID": "5183b1ac-9ddf-452b-8634-911029d07851",
	"label": "LLM chats",
	"creator": "Alain Borel",
	"target": "^https://(claude\\.ai/|chatgpt\\.com/|chat\\.openai\\.com/|chat\\.mistral\\.ai|chat\\.deepseek\\.com)",
	"minVersion": "6.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2025-09-21 10:49:36"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2025 YOUR_NAME <- TODO

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

// Platform-specific configurations
const PLATFORMS = {
	"claude.ai": {
		company: "Anthropic",
		defaultToolName: "Claude",
		urlPattern: /claude\.ai\/(chat|share)\//,
		selectors: {
			title: [
				'[data-testid="chat-title"]',
				'.chat-title',
				'h1[data-testid*="title"]',
				'.conversation-title',
				'title'
			],
			userMessage: [
				'[data-testid="user-message"]',
				'.user-message',
				'[role="user"]',
				'.human-message'
			],
			assistantMessage: [
				'[data-testid="assistant-message"]',
				'.assistant-message',
				'[role="assistant"]',
				'.claude-message'
			],
			timestamp: [
				'[data-testid="message-timestamp"]',
				'.timestamp',
				'time',
				'[datetime]',
				'.message-time'
			],
			model: [
				'[data-testid="model-name"]',
				'.model-name',
				'[aria-label*="model"]',
				'.model-selector'
			]
		},
		rights: "© Anthropic"
	},
	
	"chatgpt.com": {
		company: "OpenAI",
		defaultToolName: "ChatGPT",
		urlPattern: /(chatgpt\.com|chat\.openai\.com)/,
		selectors: {
			title: [
				'[data-testid="conversation-title"]',
				'.conversation-title',
				'h1',
				'[role="heading"]',
				'title'
			],
			userMessage: [
				'[data-message-author-role="user"]',
				'.user-message',
				'[role="user"]',
				'.human-message',
				'[data-testid="user-message"]'
			],
			assistantMessage: [
				'[data-message-author-role="assistant"]',
				'.assistant-message',
				'[role="assistant"]',
				'.gpt-message',
				'[data-testid="assistant-message"]'
			],
			timestamp: [
				'[data-testid="conversation-timestamp"]',
				'.timestamp',
				'time',
				'[datetime]',
				'.message-timestamp'
			],
			model: [
				'[data-testid="model-switcher"]',
				'.model-name',
				'[aria-label*="GPT"]',
				'.model-selector',
				'[title*="GPT"]'
			]
		},
		rights: "© OpenAI"
	},

	"mistral.ai": {
		company: "Frontier AI",
		defaultToolName: "Mistral",
		urlPattern: /chat\.mistral\.ai/,
		selectors: {
			title: [
				'[data-testid="conversation-title"]',
				'.conversation-title',
				'h1',
				'[role="heading"]',
				'title'
			],
			userMessage: [
				'[data-message-author-role="user"]',
				'.user-message',
				'[role="user"]',
				'.human-message',
				'[data-testid="user-message"]'
			],
			assistantMessage: [
				'[data-message-author-role="assistant"]',
				'.assistant-message',
				'[role="assistant"]',
				'.gpt-message',
				'[data-testid="assistant-message"]'
			],
			timestamp: [
				'[data-testid="conversation-timestamp"]',
				'.timestamp',
				'time',
				'[datetime]',
				'.message-timestamp'
			],
			model: [
				'[data-testid="model-switcher"]',
				'.model-name',
				'[aria-label*="Mistral"]',
				'.model-selector',
				'[title*="Mistral"]'
			]
		},
		rights: "© Frontier AI"
	},

	"deepseek.com": {
		company: "DeepSeek",
		defaultToolName: "DeepSeek",
		urlPattern: /chat\.deepseek\.com\/(a\/chat|share)/,
		selectors: {
			title: [
				'[data-testid="conversation-title"]',
				'.conversation-title',
				'h1',
				'[role="heading"]',
				'title'
			],
			userMessage: [
				'[data-message-author-role="user"]',
				'.user-message',
				'[role="user"]',
				'.human-message',
				'[data-testid="user-message"]'
			],
			assistantMessage: [
				'[data-message-author-role="assistant"]',
				'.assistant-message',
				'[role="assistant"]',
				'.gpt-message',
				'[data-testid="assistant-message"]'
			],
			timestamp: [
				'[data-testid="conversation-timestamp"]',
				'.timestamp',
				'time',
				'[datetime]',
				'.message-timestamp'
			],
			model: [
				'[data-testid="model-switcher"]',
				'.model-name',
				'[aria-label*="Mistral"]',
				'.model-selector',
				'[title*="Mistral"]'
			]
		},
		rights: "© DeepSeek"
	}
};


function detectWeb(doc, url) {
	for (let domain in PLATFORMS) {
		if (PLATFORMS[domain].urlPattern.test(url)) {
			return "webpage";
		}
	}
	// Should always return a webpage if the URL matches the translator target
	// a failsafe cannot hurt
	return false;
}

function getPlatformConfig(url) {
	for (let domain in PLATFORMS) {
		if (PLATFORMS[domain].urlPattern.test(url)) {
			return { domain, config: PLATFORMS[domain] };
		}
	}
	return null;
}

function findElementBySelectors(doc, selectors) {
	for (let selector of selectors) {
		let element = doc.querySelector(selector);
		if (element && element.textContent.trim()) {
			return element;
		}
	}
	return null;
}

function extractTitle(doc, config, url) {
	// Try platform-specific title selectors
	let titleElement = findElementBySelectors(doc, config.selectors.title);
	if (titleElement) {
		let title = titleElement.textContent.trim();
		// Filter out generic titles
		if (title && title !== config.defaultToolName && title !== config.company && title !== "New chat" && title !== "Untitled") {
			return title;
		}
	}
	
	// Fallback: extract from first user message
	let firstMessage = findElementBySelectors(doc, config.selectors.userMessage);
	if (firstMessage) {
		let messageText = firstMessage.textContent.trim();
		// Use first 50 characters as title
		return messageText.length > 50 ? messageText.substring(0, 50) + "..." : messageText;
	}
	
	// Final fallback
	return config.defaultToolName + " Chat";
}

function extractDate(doc, config) {
	let date = new Date();
	
	// Look for date elements using platform-specific selectors
	let dateElement = findElementBySelectors(doc, config.selectors.timestamp);
	if (dateElement) {
		let dateText = dateElement.getAttribute('datetime') || 
					   dateElement.getAttribute('title') || 
					   dateElement.textContent;
		let parsedDate = new Date(dateText);
		if (!isNaN(parsedDate)) {
			date = parsedDate;
		}
	}
	
	return date.getFullYear() + "-" + 
		   String(date.getMonth() + 1).padStart(2, '0') + "-" + 
		   String(date.getDate()).padStart(2, '0');
}

function extractModel(doc, config) {
	let modelElement = findElementBySelectors(doc, config.selectors.model);
	if (modelElement) {
		let modelText = modelElement.textContent.trim() || 
						modelElement.getAttribute('aria-label') || 
						modelElement.getAttribute('title');
		if (modelText) {
			// Clean up model name
			return modelText.replace(/^(Model: |Using )/i, '').trim();
		}
	}
	
	return config.defaultToolName;
}

function extractAbstract(doc, config) {
	let firstUserMessage = findElementBySelectors(doc, config.selectors.userMessage);
	let firstAssistantMessage = findElementBySelectors(doc, config.selectors.assistantMessage);
	
	if (firstUserMessage && firstAssistantMessage) {
		let userText = firstUserMessage.textContent.trim().substring(0, 200);
		let assistantText = firstAssistantMessage.textContent.trim().substring(0, 200);
		return "User: " + userText + (userText.length === 200 ? "..." : "") + 
			   "\n\nAssistant: " + assistantText + (assistantText.length === 200 ? "..." : "");
	}
	
	return "";
}

function doWeb(doc, url) {
	let item = new Zotero.Item("webpage");

	let platformInfo = getPlatformConfig(url);
	if (!platformInfo) {
		throw new Error("Unsupported platform");
	}
	
	let { domain, config } = platformInfo;

	// Author: AI Company Name
	item.creators.push({
		firstName: "",
		lastName: config.company,
		creatorType: "author"
	});
	
	// Title: Title of chat
	item.title = extractTitle(doc, config, url);
	
	// Date: year, month day
	item.date = extractDate(doc, config);
	
	// Website Type: Generative AI chat
	item.websiteType = "Generative AI chat";
	
	// Website title: Tool Name/Model
	item.websiteTitle = extractModel(doc, config);
	
	// URL: URL of the chat
	item.url = url;
	
	// Additional standard fields
	item.accessDate = new Date().toISOString().split('T')[0];
	item.language = "en";
	item.rights = config.rights;
	
	// Abstract - first exchange if available
	let abstract = extractAbstract(doc, config);
	if (abstract) {
		item.abstractNote = abstract;
	}
	
	// Add platform identifier in extra field for reference
	item.extra = "Platform: " + domain;
	
	item.complete();
}

/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://claude.ai/share/aa94e62a-d95e-4753-ac54-8ac43380c5b7",
		"items": [
			{
				"itemType": "webpage",
				"title": "Public read-only chat link | Claude",
				"creators": [
					{
						"firstName": "",
						"lastName": "Anthropic",
						"creatorType": "author"
					}
				],
				"date": "2025-09-21",
				"language": "en",
				"rights": "© Anthropic",
				"url": "https://claude.ai/share/aa94e62a-d95e-4753-ac54-8ac43380c5b7",
				"websiteTitle": "Claude",
				"websiteType": "Generative AI chat",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://chatgpt.com/share/68cfbfa8-20b8-8013-a80a-50c016c2ff26",
		"items": [
			{
				"itemType": "webpage",
				"title": "Meaning of life discussion",
				"creators": [
					{
						"firstName": "",
						"lastName": "OpenAI",
						"creatorType": "author"
					},
					{
						"firstName": "",
						"lastName": "OpenAI",
						"creatorType": "author"
					}
				],
				"date": "2025-09-21",
				"abstractNote": "User: what is the meaning of life\n\nAssistant: That’s one of the deepest questions humans have ever asked.\nPhilosophers, scientists, and spiritual traditions all approach it differently:\n\n\nPhilosophy: Some argue life’s meaning is something we crea...",
				"extra": "Platform: chatgpt.com",
				"language": "en",
				"rights": "© OpenAI",
				"url": "https://chatgpt.com/share/68cfbfa8-20b8-8013-a80a-50c016c2ff26",
				"websiteTitle": "ChatGPT",
				"websiteType": "Generative AI chat",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://chat.deepseek.com/share/un1ogabztmju2mn2bv",
		"items": [
			{
				"itemType": "webpage",
				"title": "DeepSeek - Into the Unknown",
				"creators": [
					{
						"firstName": "",
						"lastName": "DeepSeek",
						"creatorType": "author"
					}
				],
				"date": "2025-09-21",
				"extra": "Platform: deepseek.com",
				"language": "en",
				"rights": "© DeepSeek",
				"url": "https://chat.deepseek.com/share/un1ogabztmju2mn2bv",
				"websiteTitle": "DeepSeek",
				"websiteType": "Generative AI chat",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://chat.mistral.ai/chat/8db6db48-7394-44a3-8906-b4d2d874e3bc",
		"items": [
			{
				"itemType": "webpage",
				"title": "quel est le sens de la vie?",
				"creators": [
					{
						"firstName": "",
						"lastName": "Frontier AI",
						"creatorType": "author"
					}
				],
				"date": "2025-09-21",
				"abstractNote": "User: quel est le sens de la vie?8:27am\n\nAssistant: La question du sens de la vie est l’une des plus anciennes et des plus profondes de l’humanité ! Selon les philosophies, les cultures et les croyances, les réponses varient énormément.\nQuelques perspe...",
				"extra": "Platform: mistral.ai",
				"language": "en",
				"rights": "© Frontier AI",
				"url": "https://chat.mistral.ai/chat/8db6db48-7394-44a3-8906-b4d2d874e3bc",
				"websiteTitle": "Mistral",
				"websiteType": "Generative AI chat",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
