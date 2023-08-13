// <html>
// <head>
// 	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
// 	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
// 	<style>
// 		body {
// 			font-family: "Segoe UI";
// 			background-color: rgb(239, 242, 246);
// 			padding: 5px;
// 			overflow-wrap: break-word;
// 		}
// 		.content { padding-top: 30px; }
// 		.message { padding-bottom: 10px; }
// 		input[type=button] { width: 110px; }
// 	</style>
// 	<script type="text/javascript" src="ClientGlobalContext.js.aspx"></script>
// 	<script type="text/javascript" src="new_webapiclient"></script>
// 	<script type="text/javascript" src="new_jquery-3.4.1.min.js"></script>
// 	<script type="text/javascript" src="new_msal-browser.js"></script>
// 	<script type="text/javascript" language="javascript">
// 		let _accessToken = null;

// 		$(document).ready(function () {
// 			$('#divConfirm').show();
// 			$('#divProgress').hide();

// 			let context = window.opener.Xrm.Utility.getGlobalContext();
// 			let lcid = context.getUserLcid();
// 			if (lcid == "1036") {
// 				$("#btnCancel").prop("value", "Annuler");
// 				$("#spnTitle").html("Emplacements des documents SharePoint");
// 				$('#divConfirmMsg').html("MX360 est sur le point de créer des fichiers SharePoint pour ce dossier. .<br/><br/>Cliquez sur OK pour continuer, ou sur Annuler pour quitter.");
// 				$('#divProgressMsg').html("Veuillez patienter pendant que MX360 traite votre demande ...");
// 			}
// 			else {
// 				$("#btnCancel").prop("value", "Cancel");
// 				$("#spnTitle").html("SharePoint Document Locations");
// 				$('#divConfirmMsg').html("MX360 is about to create SharePoint folders for this record.<br/><br/>Click OK to continue, or click Cancel to exit.");
// 				$('#divProgressMsg').html("Please wait while MX360 is processing your request ...");
// 			}

// 			let authority = 'https://login.microsoftonline.com/de216a9c-0a44-4c23-9405-43bd43e1c6d0';
// 			let clientId = GetCustomConfiguration('SharePointIntegrationService', 'CrmApi_ClientId');
// 			let scope = GetCustomConfiguration('SharePointIntegrationService', 'CrmApi_Scope');

// 			signIn(authority, clientId, scope);
// 		});

// 		async function Continue_OnClick() {
// 			$('#divConfirm').hide();
// 			$('#divProgress').show();

// 			let strData = GetParameterByName("data");
// 			if (strData == null || strData == "") {
// 				throw "Missing data parameter in query string.";
// 			}
// 			var values = strData.split(',');

// 			for (let i = 0; i < 30; i++) {
// 				if (_accessToken == null) {
// 					await delay(1000);
// 				} else {
// 					break;
// 				}
// 			}
// 			if (_accessToken == null) {
// 				throw "Missing access token.";
// 			}

// 			let apimSubscriptionValue = GetCustomConfiguration('SharePointIntegrationService', 'CrmApi_ApimSubscriptionValue');
// 			const headers = new Headers();
// 			headers.append("Content-Type", "application/json");
// 			headers.append("Accept", "*/*");
// 			headers.append("Authorization", `Bearer ${_accessToken}`);
// 			headers.append("Ocp-Apim-Subscription-Key", apimSubscriptionValue);

// 			var data = {
// 				"logicalName": values[0],
// 				"id": values[1],
// 			};

// 			const options = {
// 				method: "POST",
// 				headers: headers,
// 				body: JSON.stringify(data),
// 			};

// 			let baseUrl = GetCustomConfiguration('SharePointIntegrationService', 'CrmApi_BaseUrl');
// 			let apiUrl = baseUrl + "/api/folders";

// 			fetch(apiUrl, options)
// 				.then((response) => response.text())
// 				.then(data => {
// 					if ('' + data != '1') {
// 						$('#divProgressMsg').html(GetErrorMessage('' + data));
// 					}
// 					else {
// 						$('#divProgressMsg').html(GetErrorMessage('1'));
// 						if (window.opener != undefined && window.opener != null) {
// 							window.opener.Xrm.Page.ui.refreshRibbon();

// 							//var formContext = executionContext.getFormContext();
// 							let tabSPDocuments = window.opener.Xrm.Page.ui.navigation.items.get("navSPDocuments");
// 							tabSPDocuments.setVisible(true);
// 						}
// 					}
// 				})
// 				.catch(error => {
// 					$('#divProgressMsg').html(GetErrorMessage('0'));
// 				})
// 				.then((data) => {
// 					$('#imgWaitWheele').hide();
// 					$('#btnOK').prop("disabled", false);
// 				});
// 		}

// 		async function signIn(authority, clientId, scope) {
// 			const msalConfig = {
// 				auth: {
// 					authority: authority,
// 					clientId: clientId,
// 					redirectUri: window.location.origin + window.location.pathname
// 				},
// 				cache: {
// 					cacheLocation: "sessionStorage",
// 					storeAuthStateInCookie: false,
// 				},
// 				system: {
// 					loggerOptions: {
// 						loggerCallback: (level, message, containsPii) => {
// 							if (containsPii) {
// 								return;
// 							}
// 							switch (level) {
// 								case msal.LogLevel.Error:
// 									console.error(message);
// 									return;
// 								case msal.LogLevel.Info:
// 									console.info(message);
// 									return;
// 								case msal.LogLevel.Verbose:
// 									console.debug(message);
// 									return;
// 								case msal.LogLevel.Warning:
// 									console.warn(message);
// 									return;
// 							}
// 						}
// 					}
// 				}
// 			};
// 			let myMsal = new msal.PublicClientApplication(msalConfig);

// 			const loggedInAccounts = myMsal.getAllAccounts();
// 			let tokenRequest = {
// 				scopes: [scope],
// 				forceRefresh: false
// 			};

// 			if (loggedInAccounts !== null && loggedInAccounts.length > 0) {
// 				tokenRequest.account = loggedInAccounts[0];

// 				const cachedAuthResponse = await myMsal.acquireTokenSilent(tokenRequest).catch(error => {
// 					console.log(error);
// 				});

// 				if (cachedAuthResponse) {
// 					console.log("Obtained token from cache.");
// 					_accessToken = cachedAuthResponse.accessToken;
// 					$('#btnContinue').prop("disabled", false);
// 					$('#btnCancel').prop("disabled", false);
// 				}
// 			}
// 			else {
// 				console.log("Acquiring token using redirect");
// 				myMsal.handleRedirectPromise().then(handleMsalResponse).catch(err => {
// 					console.error(">>> handleRedirectPromise(): error: " + err);
// 				});
// 				await myMsal.acquireTokenRedirect(tokenRequest);
// 			}
// 		}

// 		async function handleMsalResponse(tokenResponse) {
// 			console.log(">>> handleMsalResponse(): tokenResponse: " + tokenResponse !== null);
// 			if (tokenResponse !== null) {
// 				let generatedBy = tokenResponse.account.username;
// 				console.log(">>> handleMsalResponse(): this is coming back from a successful auth redirect. account.username: " + generatedBy);
// 				//let account = tokenResponse.account.homeAccountId;
// 				_accessToken = tokenResponse.accessToken;
// 				$('#btnContinue').prop("disabled", false);
// 				$('#btnCancel').prop("disabled", false);
// 			}
// 			else {
// 				console.log(">>> handleMsalResponse(): response is null");
// 			}
// 		}

// 		const delay = ms => new Promise(res => setTimeout(res, ms));

// 		function GetErrorMessage(errorCode) {
// 			let context = window.opener.Xrm.Utility.getGlobalContext();
// 			let userLcid = context.getUserLcid();
// 			var FRENCH_LCID = 1036;

// 			var S_TITLE_ENGLISH = "Dynamics CRM was unable to create a SharePoint document location: <br/><br/>";
// 			var S_TITLE_FRENCH = "Dynamics CRM n'a pas été en mesure de créer un emplacement de documents SharePoint : <br/><br/>";

// 			var S_STATUS_MESSAGE_ENGLISH_SUCCESS = "SharePoint document location was successfully created.";
// 			var S_STATUS_MESSAGE_FRENCH_SUCCESS = "Un emplacement de documents SharePoint a été créé avec succès.";

// 			var S_STATUS_MESSAGE_ENGLISH_NO_PARENT = "This record does not have a parent contact or account.";
// 			var S_STATUS_MESSAGE_FRENCH_NO_PARENT = "Le présent dossier ne contient pas de contact ou de compte parent.";

// 			var S_STATUS_MESSAGE_ENGLISH_FAILED_GET_PARENT = "Failed to retrieve parent contact or account information.";
// 			var S_STATUS_MESSAGE_FRENCH_FAILED_GET_PARENT = "N'est pas parvenu à accéder aux renseignements sur le contact ou le compte parent.";

// 			var S_STATUS_MESSAGE_ENGLISH_FAILED_CREATE_STUCTURE = "Failed to create SharePoint folder structure.";
// 			var S_STATUS_MESSAGE_FRENCH_FAILED_CREATE_STUCTURE = "N'est pas parvenu à créer un fichier SharePoint.";

// 			var S_STATUS_MESSAGE_ENGLISH_FAILED_CREATE_CHILD_FOLDER = "Failed to create SharePoint folder for this record.";
// 			var S_STATUS_MESSAGE_FRENCH_FAILED_CREATE_CHILD_FOLDER = "N'est pas parvenu à créer un fichier SharePoint pour le présent dossier.";

// 			var S_STATUS_MESSAGE_ENGLISH_FAILED_SET_PERMISSION = "Failed to set folder permissions.";
// 			var S_STATUS_MESSAGE_FRENCH_FAILED_SET_PERMISSION = "N'est pas parvenu à établir des permissions d'accès aux fichiers.";

// 			var S_STATUS_MESSAGE_ENGLISH_FAILED_GET_NEW_ID = "Failed to get entity id for this record.";
// 			var S_STATUS_MESSAGE_FRENCH_FAILED_GET_NEW_ID = "N'est pas parvenu à obtenir une identification de l'entité pour le présent dossier.";

// 			var S_STATUS_MESSAGE_ENGLISH_FAILED_GET_PRIVATE_GROUP = "Failed to security role information.";
// 			var S_STATUS_MESSAGE_FRENCH_FAILED_GET_PRIVATE_GROUP = "N'est pas parvenu à obtenir des renseignements sur le rôle de sécurité.";

// 			var S_STATUS_MESSAGE_ENGLISH_FAILED_ASSOCIATE_PARENT = "Failed to create document location in Dynamics CRM.";
// 			var S_STATUS_MESSAGE_FRENCH_FAILED_ASSOCIATE_PARENT = "N'est pas parvenu à créer un emplacement de documents dans Dynamics CRM.";

// 			var S_STATUS_MESSAGE_ENGLISH_FAILED_ASSOCIATE = "Failed to create document location in Dynamics CRM for the child record.";
// 			var S_STATUS_MESSAGE_FRENCH_FAILED_ASSOCIATE = "N'est pas parvenu à créer un emplacement de documents dans Dynamics CRM pour le dossier enfant.";

// 			var S_STATUS_MESSAGE_ENGLISH_INVALID_PARENT = "Invalid parent entity.";
// 			var S_STATUS_MESSAGE_FRENCH_INVALID_PARENT = "Entité parente invalide.";

// 			var S_STATUS_MESSAGE_ENGLISH_INVALID_SP_SITE_URL = "Invalid SharePoint site URL. Please contact administrator.";
// 			var S_STATUS_MESSAGE_FRENCH_INVALID_SP_SITE_URL = "URL du site SharePoint invalide. Veuillez communiquer avec l'administrateur.";

// 			var S_STATUS_MESSAGE_ENGLISH_GENERAL = "General error.";
// 			var S_STATUS_MESSAGE_FRENCH_GENERAL = "Erreur générale.";

// 			if (errorCode == "-1") { //Error Code 8025
// 				return (userLcid == FRENCH_LCID ? S_TITLE_FRENCH + S_STATUS_MESSAGE_FRENCH_INVALID_SP_SITE_URL : S_TITLE_ENGLISH + S_STATUS_MESSAGE_ENGLISH_INVALID_SP_SITE_URL);
// 			}
// 			if (errorCode == "0") {//Error Code 8026
// 				return (userLcid == FRENCH_LCID ? FRENCH_LCIDS_TITLE_FRENCH + S_STATUS_MESSAGE_FRENCH_GENERAL : S_TITLE_ENGLISH + S_STATUS_MESSAGE_ENGLISH_GENERAL);
// 			}
// 			if (errorCode == "1") {//Error Code 8027
// 				return (userLcid == FRENCH_LCID ? S_STATUS_MESSAGE_FRENCH_SUCCESS : S_STATUS_MESSAGE_ENGLISH_SUCCESS);
// 			}
// 			if (errorCode == "2") {//Error Code 8028
// 				return (userLcid == FRENCH_LCID ? S_TITLE_FRENCH + S_STATUS_MESSAGE_FRENCH_NO_PARENT : S_TITLE_ENGLISH + S_STATUS_MESSAGE_ENGLISH_NO_PARENT);
// 			}
// 			if (errorCode == "3") {//Error Code 8029
// 				return (userLcid == FRENCH_LCID ? S_TITLE_FRENCH + S_STATUS_MESSAGE_FRENCH_FAILED_GET_PARENT : S_TITLE_ENGLISH + S_STATUS_MESSAGE_ENGLISH_FAILED_GET_PARENT);
// 			}
// 			if (errorCode == "4") {//Error Code 8030
// 				return (userLcid == FRENCH_LCID ? S_TITLE_FRENCH + S_STATUS_MESSAGE_FRENCH_FAILED_CREATE_STUCTURE : S_TITLE_ENGLISH + S_STATUS_MESSAGE_ENGLISH_FAILED_CREATE_STUCTURE);
// 			}
// 			if (errorCode == "5") {//Error Code 8031
// 				return (userLcid == FRENCH_LCID ? S_TITLE_FRENCH + S_STATUS_MESSAGE_FRENCH_FAILED_CREATE_CHILD_FOLDER : S_TITLE_ENGLISH + S_STATUS_MESSAGE_ENGLISH_FAILED_CREATE_CHILD_FOLDER);
// 			}
// 			if (errorCode == "6") {//Error Code 8032
// 				return (userLcid == FRENCH_LCID ? S_TITLE_FRENCH + S_STATUS_MESSAGE_FRENCH_FAILED_SET_PERMISSION : S_TITLE_ENGLISH + S_STATUS_MESSAGE_ENGLISH_FAILED_SET_PERMISSION);
// 			}
// 			if (errorCode == "7") {//Error Code 8033
// 				return (userLcid == FRENCH_LCID ? S_TITLE_FRENCH + S_STATUS_MESSAGE_FRENCH_FAILED_GET_NEW_ID : S_TITLE_ENGLISH + S_STATUS_MESSAGE_ENGLISH_FAILED_GET_NEW_ID);
// 			}
// 			if (errorCode == "9") {//Error Code 8034
// 				return (userLcid == FRENCH_LCID ? S_TITLE_FRENCH + S_STATUS_MESSAGE_FRENCH_FAILED_GET_PRIVATE_GROUP : S_TITLE_ENGLISH + S_STATUS_MESSAGE_ENGLISH_FAILED_GET_PRIVATE_GROUP);
// 			}
// 			if (errorCode == "10") {//Error Code 8035
// 				return (userLcid == FRENCH_LCID ? S_TITLE_FRENCH + S_STATUS_MESSAGE_FRENCH_FAILED_ASSOCIATE_PARENT : S_TITLE_ENGLISH + S_STATUS_MESSAGE_ENGLISH_FAILED_ASSOCIATE_PARENT);
// 			}
// 			if (errorCode == "11") {//Error Code 8036
// 				return (userLcid == FRENCH_LCID ? S_TITLE_FRENCH + S_STATUS_MESSAGE_FRENCH_FAILED_ASSOCIATE : S_TITLE_ENGLISH + S_STATUS_MESSAGE_ENGLISH_FAILED_ASSOCIATE);
// 			}
// 		}

// 		function GetCustomConfiguration(app, key) {
// 			var fetchxml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
// 				"<entity name='new_customconfiguration'>" +
// 				"<attribute name='new_value' />" +
// 				"<filter type='and'>" +
// 				"<condition attribute='new_application' operator='eq' value='" + app + "' />" +
// 				"<condition attribute='new_key' operator='eq' value='" + key + "' />" +
// 				"</filter>" +
// 				"</entity>" +
// 				"</fetch>";
// 			var returnUrl = null;

// 			var request = {
// 				entityName: "new_customconfiguration",
// 				async: false,
// 				fetchXml: fetchxml
// 			};
// 			var response = WebApiClient.Retrieve(request);
// 			if (response.value.length > 0) {
// 				returnUrl = response.value[0].new_value;
// 			}
// 			return returnUrl;
// 		}

// 		function GetParameterByName(name, url = window.location.href) {
// 			name = name.replace(/[\[\]]/g, '\\$&');
// 			var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
// 			var results = regex.exec(url);
// 			if (!results) return null;
// 			if (!results[2]) return '';
// 			return decodeURIComponent(results[2].replace(/\+/g, ' '));
// 		}
// 	</script>
// </head>
// <body>
// 	<span id="spnTitle" style="font-weight: bold;">SharePoint Document Locations</span><br />
// 	<div id="divConfirm" class="content">
// 		<div id="divConfirmMsg" class="message"></div><br />
// 		<input type="button" id="btnContinue" value="OK" onclick="Continue_OnClick();" disabled ="disabled" />
// 		<input type="button" id="btnCancel" value="Cancel" onclick="window.close();" disabled ="disabled" />
// 	</div>
// 	<div id="divProgress" class="content">
// 		<img alt="Please wait" src="new_wait_wheele.gif" id="imgWaitWheele" />
// 		<div id="divProgressMsg" class="message"></div><br />
// 		<input type="button" id="btnOK" value="OK" disabled="disabled" onclick="window.close();" />
// 	</div>
// </body>
// </html>
